import React from 'react';
import styled from 'styled-components';
import { grey, blue } from '@material-ui/core/colors';
import {
    Button,
    MuiThemeProvider,
    createMuiTheme,
    TextField
} from '@material-ui/core';

import DateFnsUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

import { capitalize } from '../../utils/string';
import dataFields from '../../constants/dataFields';
import { Overlay } from '../../components';
import {
    Container,
    Main,
    Title,
    Action
} from '../../constants/modalContainers';

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

const makeFormFields = ({ type: componentType, data, entity, onChange }) => {
    const fields = dataFields[entity];
    const isEdit = componentType === 'edit';

    return fields.map(({ name, required, type }) => {
        switch (type) {
            case 'string':
                return (
                    <TextField
                        required={required}
                        label={capitalize(name)}
                        key={name}
                        value={data[name]}
                        onChange={onChange(type, name)}
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
                        value={data[name]}
                        onChange={onChange(type, name)}
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
                            onChange={onChange(type, name)}
                            value={
                                data[name] ? new Date(Number(data[name])) : null
                            }
                        />
                    </MuiPickersUtilsProvider>
                );

            default:
                break;
        }
        return null;
    });
};

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
