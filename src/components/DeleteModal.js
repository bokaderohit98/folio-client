import React from 'react';
import { Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';

import Overlay from './Overlay';
import {
    Container,
    Main,
    Title,
    Subtitle,
    Action
} from '../constants/modalContainers';

const DeleteModal = ({ show, onDelete, onClose }) => {
    const theme = createMuiTheme({
        palette: { primary: red, secondary: grey }
    });
    return (
        show && (
            <>
                <Overlay />
                <Container>
                    <Main>
                        <Title>Do you want to delete this?</Title>
                        <Subtitle>Warning! This can&apos;t be undone.</Subtitle>
                        <MuiThemeProvider theme={theme}>
                            <Action>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: '8px' }}
                                    onClick={onDelete}
                                >
                                    Delete
                                </Button>
                            </Action>
                        </MuiThemeProvider>
                    </Main>
                </Container>
            </>
        )
    );
};

export default DeleteModal;
