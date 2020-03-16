import React from 'react';
import styled from 'styled-components';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { capitalize } from '../../utils/string';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 12px;
    border-top: 2px solid rgba(0, 0, 0, 0.44);
    color: ${props => props.theme.palette.text.primary};
    margin-bottom: 56px;
    box-sizing: border-box;

    .MuiListItemText-secondary {
        color: ${props => props.theme.palette.text.secondary};
    }

    .MuiDivider-root {
        background: ${props => props.theme.palette.text.secondary};
    }
`;

const Label = styled.p`
    margin: 0;
    font-size: 16px;
    position: relative;
    top: -10px;
    left: 16px;
    width: fit-content;
    background: ${props => props.theme.palette.background.paper};
    padding: 0 4px;
`;

const renderEducation = data => {
    return data.map(({ degree, institute }, index) => (
        <div key={degree + institute + index}>
            <ListItem>
                <ListItemText
                    primary={degree}
                    secondary={`from ${institute}`}
                />
            </ListItem>
            <Divider />
        </div>
    ));
};

const renderWork = data => {
    return data.map(({ position, organization }, index) => (
        <div key={position + organization + index}>
            <ListItem>
                <ListItemText
                    primary={position}
                    secondary={`at ${organization}`}
                />
            </ListItem>
            <Divider />
        </div>
    ));
};

const renderAchivement = data => {
    return data.map(({ title }, index) => (
        <div key={title + index}>
            <ListItem>
                <ListItemText primary={title} />
            </ListItem>
            <Divider />
        </div>
    ));
};

const Entity = ({ label, data = [] }) => {
    return (
        <Container>
            <Label>{capitalize(label)}</Label>
            {data.length === 0 && (
                <List>
                    <ListItem>
                        <ListItemText primary="Nothing To Show" />
                    </ListItem>
                </List>
            )}
            {data.length > 0 && (
                <List>
                    {label === 'education' && renderEducation(data)}
                    {label === 'work' && renderWork(data)}
                    {label === 'achivement' && renderAchivement(data)}
                </List>
            )}
        </Container>
    );
};

export default Entity;
