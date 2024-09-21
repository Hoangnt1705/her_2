import { error } from '@sveltejs/kit';

export const ssr = false;

export const load = async ({ params, parent }) => {
    try {

        const { data } = await parent(); // Retrieve the array of resumes from parent layout

        // Find the specific resume by `pdf_id`
        const resume = data.find(item => item._id === params.pdf);

        if (!resume) {
            throw error(404, 'Resume not found');
        }

        return {
            resume, // Pass the found resume data to the page
            pdf_id: params.pdf,
        };
    } catch (err) {
        console.log('404', err);
        throw error(404);
    }
};