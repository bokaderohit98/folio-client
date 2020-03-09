import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.palette.background.paper};
`;

const Heading = styled.h2`
    color: ${props => props.theme.palette.text.primary};
    margin-bottom: 24px;
`;

const Empty = ({ message, actionText, action }) => {
    return (
        <Container>
            <Heading>{message || 'Wow So Empty!'}</Heading>
            <Button onClick={action} variant="contained" color="primary">
                {actionText}
            </Button>
        </Container>
    );
};

export default Empty;
