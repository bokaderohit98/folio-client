/* eslint-disable no-undef */

class AuthService {
    login = jwt => {
        localStorage.setItem('token', jwt);
        browserHistory.push('/home');
    };

    getToken = () => {
        return localStorage.getItem('token');
    };

    isLoggedIn = () => {
        if (this.getToken()) return true;
        return false;
    };

    alreadyLoggedIn = () => {
        browserHistory.push('/home');
    };

    logout = () => {
        localStorage.removeItem('token');
        browserHistory.push('/');
    };
}

export default AuthService;
