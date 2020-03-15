/* eslint-disable no-param-reassign */
import axios from 'axios';
import AuthService from './authService';

axios.interceptors.request.use(
    config => {
        const auth = new AuthService();

        if (auth.isLoggedIn()) {
            const token = auth.getToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
