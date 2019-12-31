// Kümmert sich um alles mit dem Javascript Localstorage um Werte zu speichern damit diese
// nicht beim Neuladen der Seite verloren gehen.

function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
    if(has(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return null;
    }
}

function has(key) {
    return localStorage.getItem(key) !== null;
}

function storeAuth(authData) {
    store("auth", authData);
}

function getAuth() {
    return get("auth");
}

export default {
    store, get, has, storeAuth, getAuth
}