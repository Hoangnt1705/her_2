import { writable } from 'svelte/store';
import { PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME, PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME } from '$env/static/public';
const accessToken = writable(null);
const refreshToken = writable(null);
const user = writable(null);

export const signInHandle = (_accessToken, _refreshToken, userData) => {
    user.set(userData);
    accessToken.set(_accessToken);
    refreshToken.set(_refreshToken);
    localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME, _refreshToken);
    localStorage.setItem('login', 'login');
    localStorage.setItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME, _accessToken);
}


