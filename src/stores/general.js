import { writable } from 'svelte/store';

export let title = writable("appName");
export let backButton = writable(false);
export let backUrl = writable("");

export let loggedIn = writable(false);

export let tempUsername = writable("");
export let tempPassword = writable("");