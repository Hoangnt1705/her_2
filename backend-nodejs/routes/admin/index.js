import express from "express"
import authAdminRoute from './auth.js';
import customerAdminRoute from "./customer.js";
import userAdminRoute from "./user.js";
const adminRoute = express.Router();


adminRoute.use('/auth', authAdminRoute)
    .use('/customer', customerAdminRoute)
    .use('/user', userAdminRoute)
    
export default adminRoute;