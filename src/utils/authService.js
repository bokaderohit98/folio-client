/* eslint-disable no-undef */
class AuthService {
    login = jwt => {
        localStorage.setItem('token', jwt);
    };

    getToken = () => {
        return localStorage.getItem('token');
    };

    isLoggedIn = () => {
        if (this.getToken()) return true;
        return false;
    };

    logout = () => {
        localStorage.removeItem('token');
    };
}

export default AuthService;
