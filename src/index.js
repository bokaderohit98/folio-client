import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import routes from './constants/routes';

class App extends React.Component {
    makeRoutes = () => {
        return routes.map(({ path, Component, exact, props }) => (
            <Route path={path} exact={exact} key={path}>
                <Component {...props} />
            </Route>
        ));
    };

    render() {
        return (
            <Router>
                <ThemeProvider theme={createMuiTheme()}>
                    <Switch>{this.makeRoutes()}</Switch>
                </ThemeProvider>
            </Router>
        );
    }
}
ReactDom.render(<App />, document.getElementById('root'));
