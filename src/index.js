import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';

import routes from './constants/routes';
import { Sidebar } from './components';

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0px;
`;

const MainArea = styled.div`
    flex: 1;
    height: 100%;
    background: ${props => props.theme.palette.background.paper};
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
                <Container>
                    <Sidebar
                        darkMode={darkMode}
                        toggleDarkMode={() => setDarkMode(!darkMode)}
                    />
                    <MainArea>
                        <Switch>{makeRoutes()}</Switch>
                    </MainArea>
                </Container>
            </ThemeProvider>
        </Router>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
