import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// mockdata
// let t = 'Successfully Sign in!'
// let c = 'Hope you will have a good experience using the service!'
export const sidebar = writable(true);
export const accessToken = writable(null);
export const refreshToken = writable(null);
export const user = writable(null);
export const visible = writable(false);
export const iconNotification = writable(null);
export const titleToast = writable(null);
export const contentToast = writable(null);
const initialScreenSize = browser ? { width: window.innerWidth, height: window.innerHeight } : { width: 0, height: 0 };
export const screenSize = writable(initialScreenSize);
