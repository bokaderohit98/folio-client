import { Home, Settings, Entity } from '../routes';

import data from './dummyData';

export default [
    {
        title: 'Home',
        path: '/home',
        Component: Home,
        exact: true,
        props: { data },
        verificationRequired: false,
        listedOnSidebar: true
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
        props: { data },
        verificationRequired: true,
        listedOnSidebar: true
    }
];
