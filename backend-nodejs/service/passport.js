// import dotenv from 'dotenv';
// dotenv.config()
// import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import passport from 'passport';
// import _ from 'lodash';
// import User from '../model/User.js';
// import Customer from '../model/Customer.js';

// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // passport.use(new LinkedInStrategy({
// //     clientID: process.env.OAUTH_LINKEDIN_KEY,
// //     clientSecret: process.env.OAUTH_LINKEDIN_SECRET,
// //     callbackURL: "/api/auth/linkedin/callback",
// //     scope: ['email', 'profile', 'openid', 'w_member_social'],
// // }, function (accessToken, refreshToken, profile, done) {
// //     // asynchronous verification, for effect...
// //     process.nextTick(function (err) {
// //         profile.accessToken = accessToken;
// //         profile.refreshToken = refreshToken;
// //         // To keep the example simple, the user's LinkedIn profile is returned to
// //         // represent the logged-in user. In a typical application, you would want
// //         // to associate the LinkedIn account with a user record in your database,
// //         // and return that user instead.
// //         return done(err, profile);
// //     });
// // }));

// // passport.use(new FacebookStrategy({
// //     clientID: process.env.OAUTH_FACEBOOK_KEY,
// //     clientSecret: process.env.OAUTH_FACEBOOK_SECRET,
// //     callbackURL: "/api/auth/facebook/callback"
// // },
// //     function (accessToken, refreshToken, profile, cb) {

// //         // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
// //         //   return cb(err, user);
// //         // });
// //         process.nextTick((err) => {
// //             profile.accessToken = accessToken;
// //             profile.refreshToken = refreshToken;
// //             return cb(err, profile);
// //         });
// //     }
// // ));

// // const getbirthDay = async (id, accessToken) => {
// //     const response = await fetch(`https://people.googleapis.com/v1/people/${id}?personFields=birthdays&key=${process.env.GOOGLE_API_KEY}&access_token=${accessToken}`);
// //     const data = await response.json();
// //     data.birthdays.map(entry => {
// //         const { year, month, day } = entry.date
// //           console.log(JSON.stringify(entry.date, null, 4));
// //     });
// //         //  const { year, month, day } = data.birthdays[0].date
// // }

// const gooogleStrategy = new GoogleStrategy({
//     clientID: process.env.OAUTH_GOOGLE_KEY,
//     clientSecret: process.env.OAUTH_GOOGLE_SECRET,
//     callbackURL: "/api/auth/google/callback",
//     scope: ['profile', 'email']
// },

//     async function (accessToken, refreshToken, profile, cb) {
//         try {
//             // get birthday user
//             // const { id } = profile
//             // await getbirthDay(id, accessToken)

//             if (!profile.emails) throw new Error('You must provide a email')
//             const email = _.find(profile.emails, { verified: true }).value;
//             if (!email) throw new Error('You must verify email address')
//             let user = await User.findOne({
//                 email: { $ne: null, $eq: email }
//             }).populate({ path: 'role', model: Customer })
//             //if existed on db
//             if (user) {
//                 // update the user with latest google profile info
//                 await User.findByIdAndUpdate(user._id, {
//                     email: email
//                 })
//                 await Customer.findByIdAndUpdate(user.role, {
//                     name: profile.displayName,
//                     avatarUrl: profile._json.picture,
//                     google: { locale: profile._json.locale }
//                 });
//                 return cb(null, { profile, message: 'Success updated' });
//                 // save the info and resolve the user doc
//             }
//             else {
//                 // if not existing will create customer 
//                 const customer = await Customer.create({
//                     name: profile.displayName,
//                     avatarUrl: profile._json.picture,
//                     google: { locale: profile._json.locale }
//                 });

//                 const user = await User.create({
//                     email: email,
//                     role: customer._id,
//                     isActive: true
//                 })
//                 return cb(null, { profile, user })

//             };
//         } catch (error) {
//             return cb(error);
//         };
//     }
// );
// passport.use(gooogleStrategy);


// export default passport;