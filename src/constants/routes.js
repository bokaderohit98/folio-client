import {
    Home,
    Login,
    Register,
    Settings,
    Education,
    Work,
    Achivement
} from '../routes';

export default [
    {
        title: 'Home',
        path: '/',
        Component: Home,
        exact: true,
        verificationRequired: false,
        listedOnSidebar: true
    },
    {
        title: 'Register',
        path: '/register',
        Component: Register,
        exact: true,
        verificationRequired: false,
        listedOnSidebar: false
    },
    {
        title: 'Login',
        path: '/login',
        Component: Login,
        exact: true,
        verificationRequired: false,
        listedOnSidebar: false
    },
    {
        title: 'Education',
        path: '/education',
        Component: Education,
        exact: true,
        verificationRequired: true,
        listedOnSidebar: true
    },
    {
        title: 'Work',
        path: '/work',
        Component: Work,
        exact: true,
        verificationRequired: true,
        listedOnSidebar: true
    },
    {
        title: 'Achivement',
        path: '/achivement',
        Component: Achivement,
        exact: true,
        verificationRequired: true,
        listedOnSidebar: true
    },
    {
        title: 'Settings',
        path: '/settings',
        Component: Settings,
        exact: true,
        verificationRequired: true,
        listedOnSidebar: true
    }
];
