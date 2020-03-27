import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import actionsType from '../redux/actionsType';

const Container = styled.div`
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 1002;
    max-width: 240px;
    background: ${props => props.theme.palette.error.main};
    color: ${props => props.theme.palette.common.white};
    padding: 12px;
    border-radius: 4px;
    transition: 0.3s all;

    .MuiIconButton-root {
        color: ${props => props.theme.palette.common.white};
        position: absolute;
        top: 0;
        right: 0;
    }
`;

const Heading = styled.p`
    font-weight: 700;
    font-size: 16px;
`;

const Message = styled.p`
    font-size: 14px;
`;

const Error = ({ type }) => {
    const { errorStatus, errorMessage } = useSelector(state => ({
        errorStatus:
            state.userError ||
            state.createEntityError ||
            state.updateInfoError ||
            state.deleteEntityError,
        errorMessage: state.errorMessage
    }));

    const dispatch = useDispatch();

    return (
        <Container style={{ right: errorStatus ? '16px' : '-240px' }}>
            <IconButton
                onClick={() => dispatch({ type: actionsType.CLEAR_ERROR })}
            >
                <i className="material-icons">highlight_off</i>
            </IconButton>
            <Heading>Error</Heading>
            <Message>{errorMessage}</Message>
        </Container>
    );
};

export default Error;
