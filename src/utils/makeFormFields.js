import React from 'react';
import styled from 'styled-components';
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { capitalize } from './string';
import dataFields from '../constants/dataFields';
import { Map } from '../components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .MuiInputBase-root,
    .MuiInputLabel-root,
    .MuiFormLabel-root,
    .MuiSelectBase-root,
    .MuiFormLabel-root.Mui-focused {
        color: ${props => props.theme.palette.text.primary};
        font-size: 16px;
    }

    .MuiFormControl-root {
        width: 100%;
        max-width: 400px;
        margin-bottom: 24px;
    }
`;

export default ({ data, entity, loading, onChange }) => {
    const fields = dataFields[entity];

    const form = fields.map(({ name, required, type, choices, signature }) => {
        switch (type) {
            case 'string':
                return (
                    <TextField
                        required={required}
                        label={capitalize(name)}
                        disabled={loading}
                        key={name}
                        value={data[name] || ''}
                        onChange={onChange(type, name)}
                    />
                );
            case 'long-string':
                return (
                    <TextField
                        required={required}
                        label={capitalize(name)}
                        key={name}
                        disabled={loading}
                        multiline
                        rows={4}
                        value={data[name] || ''}
                        onChange={onChange(type, name)}
                    />
                );
            case 'date':
                return (
                    <MuiPickersUtilsProvider utils={MomentUtils} key={name}>
                        <KeyboardDatePicker
                            format="DD/MM/YYYY"
                            disabled={loading}
                            margin="normal"
                            label={`${capitalize(name)} *`}
                            onChange={onChange(type, name)}
                            value={
                                data[name] ? new Date(Number(data[name])) : null
                            }
                        />
                    </MuiPickersUtilsProvider>
                );
            case 'select':
                return (
                    <FormControl key={name}>
                        <InputLabel id={name}>{`${capitalize(name)}${
                            required ? ' *' : ''
                        }`}</InputLabel>
                        <Select
                            labelId={name}
                            value={data[name]}
                            disabled={loading}
                            onChange={onChange(type, name)}
                        >
                            {choices.map(choice => (
                                <MenuItem key={choice} value={choice}>
                                    {capitalize(choice)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case 'map':
                return (
                    <Map
                        key={name}
                        attribute={name}
                        label={capitalize(name)}
                        disabled={loading}
                        data={data[name]}
                        onChange={onChange}
                        choices={choices}
                        signature={signature}
                    />
                );

            default:
                break;
        }
        return null;
    });

    return <Container>{form}</Container>;
};
