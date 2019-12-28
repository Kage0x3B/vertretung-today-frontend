function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

function storeAuth(authData) {
    store("auth", authData);
}

function getAuth() {
    return get("auth");
}

export default {
    store, get, storeAuth, getAuth
}