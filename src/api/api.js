import axios from "axios";
import storage from "../storage";
import permanentStore from "../stores/permanentStore";

import user from "./user";
import substitutionPlan from "./substitutionPlan";
import userSettings from "./userSettings";

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

    if(jwtToken) {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
    } else {
        axiosInstance.defaults.headers.common['Authorization'] = "";
    }

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
    substitutionPlan: substitutionPlan(axiosInstance),
    userSettings: userSettings(axiosInstance),
    setJwtToken,
    getAuth,
    hasValidAuth,
    loadAuth,
    login,
};