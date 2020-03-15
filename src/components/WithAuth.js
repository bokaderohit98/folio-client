/* eslint-disable no-undef */
import { useHistory } from 'react-router-dom';

const WithAuth = ({ children }) => {
    const history = useHistory();

    if (auth.isLoggedIn()) return children;
    history.push('/');
    return null;
};

export default WithAuth;
