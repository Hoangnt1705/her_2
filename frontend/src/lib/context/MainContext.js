import {
  PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME,
  PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME,
} from '$env/static/public'
import { goto } from "$app/navigation";
import { user, refreshToken, accessToken, historyChat, statusSend,
   lengthChat, statusLogout, messageLogout, offBtnMoreChat, sessionExpired,
   resumeTemplateID, loadingSelectTemplate } from '$lib/stores.js'
import { END_POINT } from '$lib/constants.js'
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store'; // Assuming you are using a store to manage state

import axios from 'axios'

export const signInHandle = (_accessToken, _refreshToken, userData) => {
  user.set(userData)
  accessToken.set(_accessToken)
  refreshToken.set(_refreshToken)
  localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME, _refreshToken)
  localStorage.setItem('login', 'login')
  localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME, _accessToken)
}

export const checkAuthenticated = async (token, refresh) => {

  if (!token) return false
  try {
    const res = await axios.post(`${END_POINT}/auth/verify-token`, {
      accessToken: token,
      refreshToken: refresh,
    })
    const { data } = res.data
    user.set(data.user)
    if (data.accessToken) {
      localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME, data.accessToken);
      accessToken.set(data.accessToken)
    } else {
      accessToken.set(token)
      refreshToken.set(refresh);
    }

    console.log('data', data);
  } catch (error) {
    if (error.response.data.message === 'Unauthorzied.' && error.response.status === 401) {
      try {
        const res = await axios.post(`${END_POINT}/auth/o-auth/logout`,
          {
          },
          {
            withCredentials: true // Ensure cookies are sent with the request
          })
        const data = res.data;
        localStorage.removeItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME);
        localStorage.removeItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME);
        localStorage.removeItem('login');
        refreshToken.set(null);
        accessToken.set(null);
        user.set(null);
        sessionExpired.set(true);
      } catch (error) {
        console.log(error);
      }
      console.log('error', error);
    }
    return false
  }
  return true
}

export const logOutHandle = async (_accessToken, _path) => {
  offBtnMoreChat.update(o => (o = !o));
  const refreshTokenLocal = localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME);
  try {
    const res = await axios.post(`${END_POINT}/auth/logout`,
      {
        refreshToken: refreshTokenLocal
      },
      {
        headers: { Authorization: `Bearer ${_accessToken}` },
        withCredentials: true // Ensure cookies are sent with the request
      })
    const data = res.data;
    statusLogout.set(data.success);
    messageLogout.set(data.message);
  } catch (error) {
    console.log(error);
  }
  finally {
    localStorage.removeItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME);
    localStorage.removeItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME);
    localStorage.removeItem('login');
    refreshToken.set(null);
    accessToken.set(null);
    historyChat.set([]);
    user.set(null);
    goto("/");
  }
}

export const getDataChat = async (uid, _page, _pageSize) => {
  try {
    const response = await axios.get(
      `${END_POINT}/v1/chat-and-conversation?uid=${uid}${_page ? `&page=${_page}` : ''}${_pageSize ? `&pageSize=${_pageSize}` : ''}`
    );
    const { data } = response.data;
    console.log('data', data);

    if (_page) {
      historyChat.update(c => {
        // Merge the paginated results with the existing history, preserving order
        data.results.forEach(obj => {
          c = [...c, obj];
        });
        return c;
      });
    } else {
      // Set the initial list of chats and conversations
      historyChat.set(data.results);
    }

    // Update the total length of the chats and conversations
    lengthChat.set(data.totalLength);
    return data;
  } catch (error) {
    console.error('Error fetching chat data:', error);
    return { error };
  }
};

export const parseRecruiterDocument = async (params) => {
  try {
    const response = await axios.get(`${END_POINT}/v1/parse-recruiter/document/${params.slug}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME)}` }
      }
    );

    const { data } = response.data;
    if (!data) {
      throw error(404);
    }

    return { data: data.result, status: data.success };
  } catch (err) {
    return { error: err };
  }
};

export const resumeConversation = async (params) => {
  try {
    const response = await axios.get(`${END_POINT}/v1/resume-ai/document/${params.slug}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME)}` }
      }
    );

    const { data } = response.data;
    if (!data) {
      throw error(404);
    }

    return { data: data.result, status: data.success };
  } catch (err) {
    return { error: err };
  }
};

// Function to select or deselect a resume
export const selectResume = async (templateID) => {
  loadingSelectTemplate.update(load => load = true);
  try {
    // Get the currently selected template from the store
    const currentSelected = get(resumeTemplateID);
    console.log(templateID === currentSelected);
    console.log(currentSelected);

    // If the selected resume matches the current one, deselect it
    if (templateID === currentSelected) {
      // Call backend to deselect or set resume template to null
      await axios.delete(`${END_POINT}/v1/resume-template/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME)}`,
          },
        },
        { data: null }
      );

      // Reset the resumeTemplateID store
      resumeTemplateID.set(null);
    } else {
      // Call backend to select the new resume
      const response = await axios.post(`${END_POINT}/v1/resume-template/select`, { templateID },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME)}`,
          },
        }
      );

      const result = response.data.data.result;
      console.log(result);

      // Update the store with the newly selected resume template ID
      resumeTemplateID.set(result.resume_template);
    }
  } catch (error) {
    console.error('Error selecting resume template:', error);
  }
  finally{
    setTimeout(() => {
      loadingSelectTemplate.update(load => load = false);
    }, 2000);
  }
};

export const checkedSelect = async () => {
  try {
    const response = await axios.get(`${END_POINT}/v1/resume-template/target`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME)}`,
      },
    })
    const result = response.data.data.result;
    console.log('here3', result);
    resumeTemplateID.set(result.resume_template);
  } catch (error) {

  }
}