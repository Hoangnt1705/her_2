import { writable } from 'svelte/store';

export let visible = writable(false); 
export let titleToast = writable(null);
export let contentToast = writable(null);
