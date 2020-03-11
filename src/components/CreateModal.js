import React from 'react';
import styled from 'styled-components';
import {
    Button,
    MuiThemeProvider,
    createMuiTheme,
    TextField
} from '@material-ui/core';
import { grey, blue } from '@material-ui/core/colors';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';

import formFields from '../constants/formFields';
import Overlay from './Overlay';
import { Container, Main, Title, Action } from '../constants/modalContainers';
import { capitalize } from '../utils/string';

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

const makeFormFields = ({ type: componentType, data, entity }) => {
    const fields = formFields[entity];
    const isEdit = componentType === 'edit';

    return fields.map(({ name, required, type }) => {
        switch (type) {
            case 'string':
                return (
                    <TextField
                        required={required}
                        label={capitalize(name)}
                        key={name}
                        value={isEdit ? data[name] : ''}
                        color="primary"
                    />
                );
            case 'long-string':
                return (
                    <TextField
                        required={required}
                        label={capitalize(name)}
                        key={name}
                        multiline
                        rows={4}
                        value={isEdit ? data[name] : ''}
                        color="secondary"
                    />
                );
            case 'date':
                return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils} key={name}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="DD/MM/YYYY"
                            margin="normal"
                            label={`${capitalize(name)}*`}
                            onChange={date => console.log(date)}
                            value={isEdit ? new Date(Number(data[name])) : null}
                        />
                    </MuiPickersUtilsProvider>
                );

            default:
                break;
        }
        return null;
    });
};

const CreateModal = ({ show, type, data, entity, onClose, onSuccess }) => {
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
                        {makeFormFields({ type, data, entity })}
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