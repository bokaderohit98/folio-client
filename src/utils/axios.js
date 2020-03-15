/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.interceptors.request.use(
    config => {
        if (authService.isLoggedIn()) {
            const token = authService.getToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default axios;
