/* eslint-disable no-undef */
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, useHistory } from 'react-router-dom';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import routes from './constants/routes';
import { Sidebar, WithAuth, WithVerification, Error } from './components';
import { Authentication } from './routes';
import ThemeService from './utils/themeService';
import AuthService from './utils/authService';

const Container = styled.div`
    position: relative;
    left: 240px;
    height: 100vh;
    width: calc(100% - 240px);
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
        left: 0;
    }
`;

const makeRoutes = ({ darkMode, setDarkMode }) => {
    return routes.map(
        ({ path, Component, exact, verificationRequired, props }) => {
            const link = (
                <WithAuth>
                    <Error />
                    <Sidebar
                        darkMode={darkMode}
                        toggleDarkMode={() => setDarkMode(!darkMode)}
                    />
                    <Container>
                        <ScrollBar>
                            <Component {...props} />
                        </ScrollBar>
                    </Container>
                </WithAuth>
            );
            return (
                <Route path={path} exact={exact} key={path}>
                    {verificationRequired ? (
                        <WithVerification>{link}</WithVerification>
                    ) : (
                        link
                    )}
                </Route>
            );
        }
    );
};

const App = () => {
    const Theme = new ThemeService();
    const [darkMode, setDarkMode] = useState(Theme.loadPreviousMode());
    const theme = Theme.generateTheme(darkMode);

    window.browserHistory = useHistory();
    window.auth = new AuthService();

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <Route path="/" exact>
                    <Authentication />
                </Route>
            </Switch>
            <Switch>{makeRoutes({ darkMode, setDarkMode })}</Switch>
        </ThemeProvider>
    );
};

export default App;
