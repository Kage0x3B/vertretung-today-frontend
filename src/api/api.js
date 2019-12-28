import axios from "axios";
import storage from "../storage";

import user from "./user";

const DEBUG = true;

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

axiosInstance.interceptors.response.use(function (response) {
    if (DEBUG) {
        console.log(response);
    }

    return response;
}, function (error) {
    if (DEBUG) {
        console.log(error.toJSON());
    }

    return Promise.reject(error);
});

let jwtToken = '';

function setJwtToken(token) {
    if (DEBUG) {
        console.log("Set JWT Token");
    }

    jwtToken = token;

    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;

    storage.storeAuth(getAuth());
}

function getAuth() {
    return {
        jwtToken
    };
}

function hasValidAuth() {
    return jwtToken && jwtToken.length > 0;
}

function loadAuth() {
    const authData = storage.getAuth();

    if (authData && authData.jwtToken) {
        setJwtToken(authData.jwtToken)
    }
}

function login(loginResponse) {
    if (loginResponse.data.payload.token) {
        setJwtToken(loginResponse.data.payload.token);

        return true;
    }
}

export default {
    user: user(axiosInstance),
    setJwtToken,
    getAuth,
    hasValidAuth,
    loadAuth,
    login,
};