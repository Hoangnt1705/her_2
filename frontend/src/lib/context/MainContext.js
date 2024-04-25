import { PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME, PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME } from '$env/static/public';
import {user, refreshToken, accessToken} from '$lib/store.js';

export const signInHandle = (_accessToken, _refreshToken, userData) => {
    user.set(userData);
    accessToken.set(_accessToken);
    refreshToken.set(_refreshToken);
    localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME, _refreshToken);
    localStorage.setItem('login', 'login');
    localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME, _accessToken);
}


