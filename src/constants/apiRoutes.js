export default {
    loginViaPassword: '/api/user/login',
    loginViaOtp: '/api/user/login/otp',
    register: '/api/user/register',
    getUser: '/api/user',
    resendVerificationEmail: '/api/user/verify/resend',
    createEntity: (type, id) => `/api/${type}${id ? `/${id}` : ''}`,
    deleteEntity: (type, id) => `/api/${type}/${id}`,
    updateInfo: '/api/user',
    getOtp: '/api/user/otp'
};
