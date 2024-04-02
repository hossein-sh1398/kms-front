import axios from "axios";

const api = axios.create({
    baseURL: 'https://freelancework.ir/',
    timeout: 5000,
    headers: {
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(function(config) {
    return config;
}, err => new Promise.reject(err));

api.interceptors.response.use(res => res, err => Promise.reject(err))


export default api;