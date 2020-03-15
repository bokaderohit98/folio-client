/* eslint-disable no-undef */
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import ThemeService from './utils/themeService';
import routes from './constants/routes';
import { Sidebar, WithAuth } from './components';
import { Authentication } from './routes';

const Container = styled.div`
    position: relative;
    left: 240px;
    height: 100vh;
    width: calc(100% - 240px);
    justify-content: center;
    align-items: center;
`;

const makeRoutes = ({ darkMode, setDarkMode }) => {
    return routes.map(({ path, Component, exact, props }) => (
        <Route path={path} exact={exact} key={path}>
            <WithAuth>
                <Sidebar
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                />
                <Container>
                    <Component {...props} />
                </Container>
            </WithAuth>
        </Route>
    ));
};

const App = () => {
    const Theme = new ThemeService();
    const [darkMode, setDarkMode] = useState(Theme.loadPreviousMode());
    const theme = Theme.generateTheme(darkMode);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path="/" exact>
                        <Authentication />
                    </Route>
                </Switch>
                <Switch>{makeRoutes({ darkMode, setDarkMode })}</Switch>
            </ThemeProvider>
        </Router>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
