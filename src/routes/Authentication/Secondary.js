import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Container = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: center;
    color: white;
`;

const Title = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const SubTitle = styled.p`
    font-size: 16px;
    line-height: 28px;
`;

const Secondary = ({ mode, disabled, onToggleMode }) => {
    return (
        <Container>
            <Title>
                {mode === 'login'
                    ? 'Not Registered yet?'
                    : 'Already Registered?'}
            </Title>
            <SubTitle>
                {mode === 'login'
                    ? 'Fill up personal information and start your journey with us'
                    : "Let's get you back into your account and get you going"}
            </SubTitle>
            <Button
                variant="outlined"
                style={{
                    color: 'white',
                    marginTop: '28px',
                    borderColor: 'white'
                }}
                disabled={disabled}
                onClick={onToggleMode}
            >
                {mode === 'login' ? 'sign up' : 'log in'}
            </Button>
        </Container>
    );
};

export default Secondary;
