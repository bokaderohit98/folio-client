import { useHistory } from 'react-router-dom';
import AuthService from '../utils/authService';

const WithAuth = ({ children }) => {
    const auth = new AuthService();
    const history = useHistory();

    if (auth.isLoggedIn()) return children;
    history.push('/');
    return null;
};

window.AuthService = AuthService;

export default WithAuth;
