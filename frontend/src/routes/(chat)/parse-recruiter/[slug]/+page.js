import { parseRecruiterDocument } from '$lib/context/MainContext.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  try {
    const res = await parseRecruiterDocument(params);
    
    if (res.error) {
      throw error(404, res.error.message);
    }

    return {
      data: res.data,
      cid: params.slug,
    };
  } catch (err) {
    console.log('404', err);
    throw error(404);
  }
};