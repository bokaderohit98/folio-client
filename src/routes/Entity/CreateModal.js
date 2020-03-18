import React from 'react';
import { grey, blue } from '@material-ui/core/colors';
import { Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import ClipLoader from 'react-spinners/ClipLoader';

import { Overlay } from '../../components';
import {
    Container,
    Main,
    Title,
    Action
} from '../../components/ModalContainers';

import makeFormFields from '../../utils/makeFormFields';

const CreateModal = ({
    show,
    type,
    data,
    entity,
    loading,
    error,
    onClose,
    onSuccess,
    onChange
}) => {
    const theme = createMuiTheme({
        palette: {
            primary: blue,
            secondary: grey
        }
    });

    return (
        show && (
            <>
                <Overlay />
                <Container>
                    <Main>
                        <Title
                            style={{
                                marginBottom: '20px',
                                justifyContent: 'center',
                                display: 'flex'
                            }}
                        >
                            {`${
                                type === 'create' ? 'ADD NEW' : 'EDIT'
                            } ${entity.toUpperCase()}`}
                        </Title>
                        {makeFormFields({
                            type,
                            data,
                            entity,
                            error,
                            loading,
                            onChange
                        })}
                        <MuiThemeProvider theme={theme}>
                            <Action>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={loading}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    style={{ marginLeft: '4px' }}
                                    onClick={onSuccess}
                                >
                                    {loading ? (
                                        <ClipLoader size={16} color="#ffffff" />
                                    ) : type === 'create' ? (
                                        'Add'
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

export default CreateModal;
