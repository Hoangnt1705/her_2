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
export const dataParseRecruiter = writable(null);
export const historyChat = writable([]);
export const lengthChat = writable(null);
// Store to manage the modal state
export const showModal = writable(false);
export const statusSend = writable(null);
export const recruiterData = writable(null);
export const isLoadGenerateResume = writable(false);
export const activeChatId = writable(null);
export const activeRTSidebar = writable(false);
export const selectLoginAuthorizationDiaLog = writable(false);
export const statusLogout = writable(false);
export const messageLogout = writable(null);
export const offBtnMoreChat = writable(false);
export const isModalResumePdf = writable(false);
export const dataResume = writable(null);
export const alertTryAgainGenerateResume = writable(true);
export const sessionExpired = writable(false);