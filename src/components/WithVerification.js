/* eslint-disable no-undef */
import { useSelector } from 'react-redux';

const WithVerification = ({ children }) => {
    const { user } = useSelector(state => state);
    if (user && user.verified) return children;
    browserHistory.push('/home');
    return null;
};

export default WithVerification;
