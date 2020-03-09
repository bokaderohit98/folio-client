import { Home, Login, Register, Settings, Education, Work, Achivement } from '../routes';

export default [
    { path: '/', Component: Home, exact: true },
    { path: '/register', Component: Register, exact: true },
    { path: '/login', Component: Login, exact: true },
    { path: '/settings', Component: Settings, exact: true },
    { path: '/education', Component: Education, exact: true },
    { path: '/work', Component: Work, exact: true },
    { path: '/achivement', Component: Achivement, exact: true }
];
