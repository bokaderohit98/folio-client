import React from 'react';
import styled from 'styled-components';
import {
    Button,
    MuiThemeProvider,
    createMuiTheme,
    TextField
} from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';
import ClipLoader from 'react-spinners/ClipLoader';

import Overlay from '../../components/Overlay';
import {
    Container,
    Main,
    Title,
    Action
} from '../../components/ModalContainers';

const InputContainer = styled.div`
    margin-top: 16px;

    .MuiFormControl-root {
        width: 100%;
    }

    .MuiOutlinedInput-input {
        padding: 8px 16px;
        color: ${props => props.theme.palette.text.primary};
    }
`;

const PasswordChangeModal = ({
    show,
    data,
    disabled,
    error,
    onChange,
    onUpdate,
    onClose
}) => {
    const theme = createMuiTheme({
        palette: { primary: red, secondary: grey }
    });
    return (
        show && (
            <>
                <Overlay />
                <Container>
                    <Main>
                        <Title
                            style={{
                                justifyContent: 'center',
                                display: 'flex'
                            }}
                        >
                            Change Password
                        </Title>
                        <InputContainer>
                            <TextField
                                type="password"
                                variant="outlined"
                                disabled={disabled}
                                value={data}
                                error={error.password && error.password.status}
                                helperText={
                                    error.password && error.password.message
                                }
                                onChange={onChange}
                            />
                        </InputContainer>
                        <MuiThemeProvider theme={theme}>
                            <Action>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={disabled}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: '8px' }}
                                    disabled={disabled}
                                    onClick={onUpdate}
                                >
                                    {disabled ? (
                                        <ClipLoader size={16} color="#ffffff" />
                                    ) : (
                                        'Update'
                                    )}
                                </Button>
                            </Action>
                        </MuiThemeProvider>
                    </Main>
                </Container>
            </>
        )
    );
};

export default PasswordChangeModal;
