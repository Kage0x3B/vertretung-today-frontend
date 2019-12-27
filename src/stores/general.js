import { writable } from 'svelte/store';

export let title = writable("VertretungToday");
export let prominentNav = writable(false);
export let loggedIn = writable(false);