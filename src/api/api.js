import axios from "axios";

import user from "./user";

const DEBUG = true;

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

axiosInstance.interceptors.response.use(function (response) {
    if(DEBUG) {
        console.log(response);
    }

    return response;
}, function (error) {
    if(DEBUG) {
        console.log(error.toJSON());
    }

    return Promise.reject(error);
});

const setJwtToken = function (jwtToken) {
    if(DEBUG) {
        console.log("Set JWT Token");
    }

    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
};

const privateApi = {
    setJwtToken
};

export default {user: user(axiosInstance, privateApi)};