/* eslint-disable no-undef */
import routes from '../constants/apiRoutes';
import axios from '../utils/axios';

const loginViaPassword = credentials => {
    axios
        .post(routes.loginViaPassword, credentials)
        .then(res => auth.login(res.data.token))
        .catch(err => {
            console.log(err);
        });
};

const resendVerificationEmail = (onSuccess, onFailure) => {
    axios
        .get(routes.resendVerificationEmail)
        .then(() => {
            onSuccess();
        })
        .catch(err => {
            onFailure();
        });
};

export default {
    loginViaPassword,
    resendVerificationEmail
};
