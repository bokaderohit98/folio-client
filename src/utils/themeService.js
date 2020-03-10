/* eslint-disable no-undef */
import { createMuiTheme } from '@material-ui/core';

export default class {
    generateTheme = darkMode => {
        const colorScheme = darkMode ? 'dark' : 'light';
        localStorage.setItem('colorScheme', colorScheme);

        const theme = createMuiTheme({
            palette: {
                type: colorScheme
            }
        });
        return theme;
    };

    loadPreviousMode = () => {
        const colorScheme = localStorage.getItem('colorScheme');
        const darkMode = colorScheme === 'dark';
        return darkMode;
    };
}
