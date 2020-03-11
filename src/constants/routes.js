import { Home, Login, Register, Settings, Entity } from '../routes';

import data from './dummyData';

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
        Component: Entity,
        exact: true,
        props: { data, type: 'education' },
        verificationRequired: true,
        listedOnSidebar: true
    },
    {
        title: 'Work',
        path: '/work',
        Component: Entity,
        exact: true,
        props: { data, type: 'work' },
        verificationRequired: true,
        listedOnSidebar: true
    },
    {
        title: 'Achivement',
        path: '/achivement',
        Component: Entity,
        exact: true,
        props: { data, type: 'achivement' },
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
