import { writable } from 'svelte/store';

export let title = writable("VertretungToday");
export let loggedIn = writable(false);