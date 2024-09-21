import { resumeConversation } from '$lib/context/MainContext.js';
import { error } from '@sveltejs/kit';
import { openSidebarResumeConversation } from "$lib/stores.js";
export const ssr = false;

export const load = async ({ params }) => {
  try {
    const res = await resumeConversation(params);

    if (res.error) {
      throw error(404, res.error.message);
    }
    console.log('res', res);

    openSidebarResumeConversation.update(sidebar => sidebar = true);

    return {
      data: res.data,
      cid: params.slug,
    };
  } catch (err) {
    console.log('404', err);
    throw error(404);
  }
};