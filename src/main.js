import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {}
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
        console.log("Registered service worker");
    });
}

export default app;