import React from 'react';
import styled from 'styled-components';
import { Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';

import Overlay from './Overlay';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: transparent;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px;
    width: 320px;
    border-radius: 2px;
    background: ${props => props.theme.palette.background.paper};
    box-shadow: ${props => props.theme.shadows[14]};
    color: ${props => props.theme.palette.text.primary};
    z-index: 1001;
`;

const Title = styled.p`
    font-size: 20px;
    padding: 0;
    margin: 0;
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: ${props => props.theme.palette.error.main};
`;

const Action = styled.div`
    display: flex;
    margin-top: 16px;
`;

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
