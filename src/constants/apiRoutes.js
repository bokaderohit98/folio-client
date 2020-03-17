export default {
    loginViaPassword: '/api/user/login',
    getUser: '/api/user',
    resendVerificationEmail: '/api/user/verify/resend',
    createEntity: type => `/api/${type}`
};
