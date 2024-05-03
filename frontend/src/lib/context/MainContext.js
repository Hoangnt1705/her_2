import {
  PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME,
  PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME,
} from '$env/static/public'
import { user, refreshToken, accessToken } from '$lib/stores.js'
import { END_POINT } from '$lib/constants.js'

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
      accessToken.set(data.accessToken)
    } else {
      accessToken.set(token)
      refreshToken.set(refresh)
    }
    console.log('data', data);
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}

export const logOutHandle = async (_accessToken) => {
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
    user.set(null);
  }
}

export const parseRecruiter = async (user) => {
  try {
    
    
  } catch (error) {
    console.log(error)
  }
}
