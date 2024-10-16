import express from 'express';
import ResumeTemplateSchema from '../model/ResumeTemplate.js';
import SelectResumeTemplate from "../model/SelectResumeTemplate.js";
import { sendError, sendServerError, sendSuccess } from '../helper/client.js';
import { verifyToken, rateLimitAPI } from '../middleware/index.js'

const resumeTemplateRoute = express.Router();

/**
 * @route GET /api/v1/resume-template/
 * @description Get all records of resume template (specify name, symbol, image_url fields)
 * @access public
 */

resumeTemplateRoute.get('/', async (req, res) => {
    try {
        let result = await ResumeTemplateSchema.find({}).select({ name: 1, symbol: 1, image_url: 1 });
        console.log(result);
        return sendSuccess(res, 'Get data Successfully.', { result });
    } catch (error) {
        console.error(error);
        sendError(res, 'An unexpected error occurred.', 500);
    }
});

/**
 * @route POST /api/v1/resume-template/select
 * @description insert or update template record you selected
 * @access private
 */
resumeTemplateRoute.post("/select", verifyToken, async (req, res) => {
    try {
        const { templateID } = req.body;
        console.log('templateID', templateID);
        const filter = { user: req.user.id };
        const update = { resume_template: templateID };
        const options = { new: true, upsert: true };  // { new: true } to return updated document, { upsert: true } to insert if not found
        const result = await SelectResumeTemplate.findOneAndUpdate(filter, update, options);
        console.log(result, "here>>>");

        // Send the updated document back to the client
        return sendSuccess(res, 'update record successfully', { result });
    } catch (error) {
        console.error(error);
        sendError(res, 'An unexpected error occurred.', 500);
    }
});

/**
 * @route DELETE /api/v1/resume-template/delete
 * @description delete template record you selected
 * @access private
 */
resumeTemplateRoute.delete('/delete', verifyToken, async (req, res) => {
    try {
        const record = await SelectResumeTemplate.findOneAndDelete({ user: req.user.id });
        if (!record) sendError(res, 'Record not found', 404);
        return sendSuccess(res, "Record has been deleted");
    } catch (error) {
        console.error(error);
        sendError(res, 'An unexpected error occurred.', 500);
    }
});

/**
 * @route GET /api/v1/resume-template/target
 * @description target template you selected
 * @access private
 */
resumeTemplateRoute.get('/target', verifyToken, async (req, res) => {
    try {
        const data = await SelectResumeTemplate.findOne({ user: req.user.id }).select({ resume_template: 1 });
        return sendSuccess(res, "Checked Successfully", { result: data || null });
    } catch (error) {
        console.error(error);
        sendError(res, 'An unexpected error occurred.', 500);
    }
})
export default resumeTemplateRoute;