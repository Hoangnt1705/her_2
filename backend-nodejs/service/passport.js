import dotenv from 'dotenv';
dotenv.config()
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED, VERIFY_OP } from '../constant.js';
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../index.js"

import passport from 'passport';
import _ from 'lodash';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import Customer from '../model/Customer.js';

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// passport.serializeUser((user, done) => {
//     done(null, user._id); // Assuming user._id contains the correct ObjectId
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             return done(new Error(`User with id ${id.user._id} not found`), null);
//         }
//         done(null, user);
//     } catch (error) {
//         done(new Error(`Failed to deserialize user: ${error.message}`), null);
//     }
// });

function generateTokens(user) {

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: JWT_EXPIRED });
    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: JWT_REFRESH_EXPIRED });

    return { accessToken, refreshToken };
}

const googleStrategy = new GoogleStrategy({
    clientID: process.env.OAUTH_GOOGLE_KEY,
    clientSecret: process.env.OAUTH_GOOGLE_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, cb) => {
    console.log('profile>>', profile);
    try {
        if (!profile.emails || !profile.emails.length) throw new Error('You must provide an email');

        const verifiedEmail = _.find(profile.emails, { verified: true })?.value;
        if (!verifiedEmail) throw new Error('You must verify your email address');

        let user = await User.findOne({ sub: profile._json.sub, email: verifiedEmail, isActive: true }).populate('role');
        let customer;
        // Process based on whether user exists or not
        if (user) {
            await Promise.all([
                User.findByIdAndUpdate(user._id, { sub: profile._json.sub, email: verifiedEmail }),
                Customer.findByIdAndUpdate(user.role, {
                    name: profile.displayName,
                    avatarUrl: profile._json.picture,
                    detail_info: { language: profile._json.locale }
                })
            ]);
        } else {
            // Create new customer and user
            customer = await Customer.create({
                name: profile.displayName,
                avatarUrl: profile._json.picture,
                detail_info: { language: profile._json.locale }
            });

            user = await User.create({
                email: verifiedEmail,
                role: customer._id,
                sub: profile._json.sub,
                isActive: true
            });
        };
        const userData = {
            id: user._id,
            email: user.email,
            sub: user.sub,
            phone: user.phone,
            role: user.role.name ? user.role : customer
        };
        const tokens = generateTokens(userData);
        // console.log('tokens.refreshToken', tokens.refreshToken);
        TOKEN_LIST[tokens.refreshToken] = tokens;
        // console.log('TOKEN_LIST', TOKEN_LIST);

        return cb(null, { message: 'Login successfully.', ...tokens, user: userData });
    } catch (error) {
        return cb(error);
    }
});


const linkedInStrategy = new LinkedInStrategy({
    clientID: process.env.OAUTH_LINKEDIN_KEY,
    clientSecret: process.env.OAUTH_LINKEDIN_SECRET,
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['email', 'profile', 'openid', 'w_member_social'],
}, async function (accessToken, refreshToken, profile, cb) {
    // asynchronous verification, for effect...
    // console.log('profile', profile);
    try {
        if (!profile.email || !profile.email.length) throw new Error('You must provide an email');

        const verifiedEmail = profile._json.email_verified;
        if (!verifiedEmail) throw new Error('You must verify your email address');

        let user = await User.findOne({ sub: profile._json.sub, email: profile.email, isActive: true }).populate('role');
        let customer;
        // Process based on whether user exists or not
        if (user) {
            await Promise.all([
                User.findByIdAndUpdate(user._id, { sub: profile._json.sub, email: profile.email }),
                Customer.findByIdAndUpdate(user.role, {
                    name: profile.displayName,
                    avatarUrl: profile._json.picture,
                    address: profile._json.locale.country,
                    detail_info: { language: profile._json.locale.language }
                })
            ]);
        } else {
            // Create new customer and user
            customer = await Customer.create({
                name: profile.displayName,
                avatarUrl: profile._json.picture,
                address: profile._json.locale.country,
                detail_info: { language: profile._json.locale.language }
            });

            user = await User.create({
                email: profile.email,
                sub: profile._json.sub,
                role: customer._id,
                isActive: true
            });
        }
        const userData = {
            id: user._id,
            email: user.email,
            sub: user.sub,
            phone: user.phone,
            role: user.role.name ? user.role : customer
        };
        const tokens = generateTokens(userData);
        // console.log('tokens.refreshToken', tokens.refreshToken);
        TOKEN_LIST[tokens.refreshToken] = tokens;
        // console.log('TOKEN_LIST', TOKEN_LIST);

        return cb(null, { message: 'Login successfully.', ...tokens, user: userData });
    } catch (error) {
        return cb(error);
    }
});

const facebookStrategy = new FacebookStrategy({
    clientID: process.env.OAUTH_FACEBOOK_KEY,
    clientSecret: process.env.OAUTH_FACEBOOK_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    scope: ['email', 'user_photos', 'user_hometown', 'user_location'],  // Adjust the scope according to your needs
    profileFields: [
        'id',              // User's Facebook ID
        'displayName',     // User's full name
        'name',            // Object with first, last, and middle names
        'gender',          // User's gender
        'birthday',        // User's birthday
        'emails',          // Array of emails associated with the account
        'photos',          // User's profile pictures
        'profileUrl',      // URL to user's Facebook profile
        'locale',          // User's locale/language
        'timezone',        // User's timezone
        'updated_time',    // Last time the profile was updated
        'verified'         // Whether the user has a verified account
    ]
    
},
    async function (accessToken, refreshToken, profile, cb) {

        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        console.log('profile', profile);
        try {
            // Extracting the avatar URL
            const avatarUrl = profile.photos?.[0]?.value || null;

            // Extracting email
            const email = profile.emails?.[0]?.value || null;

            // Since Facebook-provided emails are generally verified, we can assume it's verified if it's present
            const verifiedEmail = !!email;

            if (!email || !email.length) throw new Error('You must provide an email');

            console.log('verifiedEmail', verifiedEmail);
            if (!verifiedEmail) throw new Error('You must verify your email address');

            let user = await User.findOne({ sub: profile.id, email: email, isActive: true }).populate('role');
            let customer;
            // Process based on whether user exists or not
            if (user) {
                await Promise.all([
                    User.findByIdAndUpdate(user._id, { sub: profile.id, email: email }),
                    Customer.findByIdAndUpdate(user.role, {
                        name: profile.displayName,
                        avatarUrl: avatarUrl,
                    })
                ]);
            } else {
                // Create new customer and user
                customer = await Customer.create({
                    name: profile.displayName,
                    avatarUrl: avatarUrl,
                });

                user = await User.create({
                    email: email,
                    sub: profile.id,
                    role: customer._id,
                    isActive: true
                });
            }
            const userData = {
                id: user._id,
                email: user.email,
                sub: user.sub,
                phone: user.phone,
                role: user.role.name ? user.role : customer
            };
            const tokens = generateTokens(userData);
            // console.log('tokens.refreshToken', tokens.refreshToken);
            TOKEN_LIST[tokens.refreshToken] = tokens;
            // console.log('TOKEN_LIST', TOKEN_LIST);

            return cb(null, { message: 'Login successfully.', ...tokens, user: userData });
        } catch (error) {
            return cb(error);
        }

    }
);

// const getbirthDay = async (id, accessToken) => {
//     const response = await fetch(`https://people.googleapis.com/v1/people/${id}?personFields=birthdays&key=${process.env.GOOGLE_API_KEY}&access_token=${accessToken}`);
//     const data = await response.json();
//     data.birthdays.map(entry => {
//         const { year, month, day } = entry.date
//           console.log(JSON.stringify(entry.date, null, 4));
//     });
//         //  const { year, month, day } = data.birthdays[0].date
// }
passport.use('google', googleStrategy);
passport.use('linkedin', linkedInStrategy);
passport.use('facebook', facebookStrategy);
export default passport;