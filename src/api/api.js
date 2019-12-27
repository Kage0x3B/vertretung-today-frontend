import axios from "axios";

import user from "./user";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

const setJwtToken = function (jwtToken) {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
};

const privateApi = {
    setJwtToken
};

export default {user: user(axiosInstance, privateApi)};