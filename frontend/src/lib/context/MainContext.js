import {
  PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME,
  PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME,
} from '$env/static/public'

import { user, refreshToken, accessToken, historyChat, statusSend } from '$lib/stores.js'
import { END_POINT } from '$lib/constants.js'
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

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
      refreshToken.set(refresh)
    }
    console.log('data', data);
  } catch (error) {
    if (error.response.data.message === 'Unauthorzied.' && error.response.status === 401) {
      console.log('error');
      localStorage.removeItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME);
      localStorage.removeItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME);
      localStorage.removeItem('login');
      refreshToken.set(null);
      accessToken.set(null);
      user.set(null);
    }
    return false
  }
  return true
}

export const logOutHandle = async (_accessToken, _path) => {
  const refreshTokenLocal = localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME);
  try {
    await axios.post(`${END_POINT}/auth/logout`,
      {
        refreshTokenLocal
      },
      {
        headers: { authorization: `Bearer ${_accessToken}` }
      })
    console.log('Log out successfully.');

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
    window.location.href = '/';
  }
}

export const getDataChat = async (uid) => {
  try {
    const response = await axios.get(`${END_POINT}/v1/chat?uid=${uid}`);
    const { data } = response.data;
    historyChat.set(data.listChat);
    return data;
  } catch (error) {
    return { error }
  }
}

export const parseRecruiterDocument = async (params) => {
  try {
    const response = await axios.get(`${END_POINT}/v1/parse-recruiter/document/${params.slug}`);

    const { data } = response.data;
    statusSend.update(s => s = response.status);
    if (!data) {
      throw error(404);
    }

    return { data: data.result };
  } catch (err) {
    return { error: err };
  }
};
