import React from 'react';
import { TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { capitalize } from './string';
import dataFields from '../constants/dataFields';

export default ({ data, entity, onChange }) => {
    const fields = dataFields[entity];

    return fields.map(({ name, required, type }) => {
        switch (type) {
            case 'string':
                return (
                    <TextField
                        required={required}
                        label={capitalize(name)}
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
