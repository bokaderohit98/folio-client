import React from 'react';
import styled from 'styled-components';
import {
    Button,
    Select,
    TextField,
    IconButton,
    MenuItem
} from '@material-ui/core';
import { capitalize } from '../utils/string';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    max-width: 400px;
    padding: 0 12px;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.44);
    color: ${props => props.theme.palette.text.primary};
    margin-top: 24px;
`;

const Label = styled.p`
    font-size: 16px;
    position: relative;
    top: -26px;
    width: fit-content;
    background: ${props => props.theme.palette.background.paper};
    padding: 0 4px;
`;

const Handles = styled.div`
    position: relative;
    top: -24px;
`;

const HandleContainer = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    padding: 4px 8px;
    padding-bottom: 4px;
    margin-bottom: 24px;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: ${props => props.theme.shadows[4]};
    background: ${props => props.theme.palette.background.default};

    .key {
        flex: 3;
    }

    .value {
        flex: 5;
    }

    .material-icons {
        font-size: 20px;
    }

    .MuiInput-input {
        padding-left: 12px;
        font-size: 15px;
    }
`;

const commonStyle = {
    marginBottom: '0',
    marginRight: '8px'
};

const Map = ({ attribute, label, data = [], choices, onChange, signature }) => {
    let disableAdd = false;
    let key1 = '';
    let key2 = '';
    if (data.length > 0) {
        let lastEle = data[data.length - 1];
        disableAdd = Object.keys(lastEle).some(key => lastEle[key] === '');
        [key1, key2] = Object.keys(lastEle);
    }

    const handleSelectChange = index => event => {
        const { value } = event.target;
        onChange('map', attribute, 'update')({ index, key: key1, value });
    };

    const handleTextChange = index => event => {
        const { value } = event.target;
        onChange('map', attribute, 'update')({ index, key: key2, value });
    };

    return (
        <Container>
            <Label>{label}</Label>
            <Handles>
                {data.map((item, index) => (
                    <HandleContainer key={index}>
                        <Select
                            className="key"
                            style={commonStyle}
                            value={item[key1]}
                            onChange={handleSelectChange(index)}
                        >
                            {choices.map(choice => (
                                <MenuItem value={choice} key={choice}>
                                    {capitalize(choice)}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            style={commonStyle}
                            className="value"
                            value={item[key2]}
                            onChange={handleTextChange(index)}
                        />
                        <IconButton
                            onClick={() =>
                                onChange('map', attribute, 'remove')(index)
                            }
                        >
                            <i className="material-icons">cancel</i>
                        </IconButton>
                    </HandleContainer>
                ))}
                <Button
                    disabled={disableAdd}
                    variant="contained"
                    color="primary"
                    style={{ width: 'fit-content' }}
                    onClick={() => onChange('map', attribute, 'add')(signature)}
                >
                    <i className="material-icons">add</i>
                </Button>
            </Handles>
        </Container>
    );
};

export default Map;
