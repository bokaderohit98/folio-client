/* eslint-disable no-undef */
import routes from '../constants/apiRoutes';
import axios from '../utils/axios';

const loginViaPassword = (credentials, onFailure) => {
    axios
        .post(routes.loginViaPassword, credentials)
        .then(res => auth.login(res.data.token))
        .catch(err => {
            const error = err.response.data;
            onFailure(error);
        });
};

const loginViaOtp = (credentials, onFailure) => {
    axios
        .post(routes.loginViaOtp, credentials)
        .then(res => auth.login(res.data.token))
        .catch(err => {
            const error = err.response.data;
            onFailure(error);
        });
};

const register = (data, onSuccess, onFailureRegister, onFailureLogin) => {
    const credentials = { email: data.email, password: data.password };
    axios
        .post(routes.register, data)
        .then(() => {
            onSuccess(credentials);
            loginViaPassword(credentials, onFailureLogin);
        })
        .catch(err => {
            const error = err.response.data;
            onFailureRegister(error);
        });
};

const resendVerificationEmail = (onSuccess, onFailure) => {
    axios
        .get(routes.resendVerificationEmail)
        .then(() => onSuccess())
        .catch(() => onFailure());
};

const getOtp = (data, onSuccess, onFailure) => {
    axios
        .post(routes.getOtp, data)
        .then(() => onSuccess())
        .catch(err => {
            const error = err.response.data;
            onFailure(error);
        });
};

export default {
    loginViaPassword,
    loginViaOtp,
    register,
    resendVerificationEmail,
    getOtp
};
