import App from './App.svelte';

// Der Javascript Einstiegspunkt. Erstellt eine Instanz der App Komponente die sich
// um den Rest der Initialization kümmert
// und registriert den Service Worker der sich darum kümmert, dass die App auch offline funktioniert

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