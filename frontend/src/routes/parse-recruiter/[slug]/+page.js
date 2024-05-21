import axios from 'axios';
import { END_POINT } from '$lib/constants.js'
import { accessToken, dataParseRecruiter } from '$lib/stores.js'
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    try {
        const response = await axios.get(`${END_POINT}/v1/parse-recruiter/document/${params.slug}`);

        const {data} = response.data;
        if(!data) throw error(404)
        dataParseRecruiter.set(data.result.document.receiver.data);
        return {
            data: data.result,
        };
        
    } catch (err) {
        console.log('404', err)
        throw error(404)

    }
}