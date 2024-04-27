  import {
    PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME,
    PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME,
  } from '$env/static/public'
  import { user, refreshToken, accessToken } from '$lib/store.js'
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
