import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Container = styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    background: #1144e8;
    height: 56px;
    justify-content: center;
    align-items: center;
    display: none;

    @media (max-width: 768px) {
        display: flex;
    }
`;

const Message = styled.p`
    font-size: 16px;
    color: #fff;
    margin-right: 32px;
`;

const ToggleMode = ({ mode, onToggleMode }) => {
    return (
        <Container>
            <Message>
                {mode === 'login'
                    ? 'Not Registered Yet?'
                    : 'Already Registered?'}
            </Message>
            <Button
                variant="outlined"
                style={{ color: '#fff', borderColor: '#fff' }}
                onClick={onToggleMode}
            >
                {mode === 'login' ? 'sign up' : 'log in'}
            </Button>
        </Container>
    );
};

export default ToggleMode;
