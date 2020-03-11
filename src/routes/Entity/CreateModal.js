import React from 'react';
import styled from 'styled-components';
import { grey, blue } from '@material-ui/core/colors';
import { Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import { Overlay } from '../../components';
import {
    Container,
    Main,
    Title,
    Action
} from '../../constants/modalContainers';

import makeFormFields from '../../utils/makeFormFields';

const MainArea = styled(Main)`
    .MuiInputBase-root,
    .MuiInputLabel-root,
    .MuiFormLabel-root.Mui-focused {
        color: ${props => props.theme.palette.text.primary};
    }

    .MuiFormControl-root {
        width: 100%;
        margin-bottom: 24px;
    }
`;

const CreateModal = ({
    show,
    type,
    data,
    entity,
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
                    <MainArea>
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
                        {makeFormFields({ type, data, entity, onChange })}
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
                                    style={{ marginLeft: '4px' }}
                                    onClick={onSuccess}
                                >
                                    {type === 'create' ? 'Add' : 'Update'}
                                </Button>
                            </Action>
                        </MuiThemeProvider>
                    </MainArea>
                </Container>
            </>
        )
    );
};

export default CreateModal;
