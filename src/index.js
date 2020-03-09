import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';

import routes from './constants/routes';
import { Sidebar } from './components';

const Container = styled.div`
    position: relative;
    left: 240px;
    height: 100vh;
    width: calc(100% - 240px);
    justify-content: center;
    align-items: center;
`;

const makeRoutes = () => {
    return routes.map(({ path, Component, exact, props }) => (
        <Route path={path} exact={exact} key={path}>
            <Component {...props} />
        </Route>
    ));
};

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = createMuiTheme({
        palette: { type: darkMode ? 'dark' : 'light' }
    });

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Sidebar
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                />
                <Container>
                    <Switch>{makeRoutes()}</Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
