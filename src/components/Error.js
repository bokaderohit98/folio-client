import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import actionsType from '../redux/actionsType';

const View = styled.div`
    @media (min-width: 641px) {
        .Hide {
            right: -300px;
        }

        .Show {
            right: 16px;
        }
    }

    @media (max-width: 640px) {
        .Hide {
            bottom: -200px;
        }

        .Show {
            bottom: 0px;
        }
    }
`;

const Container = styled.div`
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 240px;
    z-index: 1002;
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

    @media (max-width: 640px) {
        bottom: 0;
        right: 0;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0;
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
    const clearError = () => dispatch({ type: actionsType.CLEAR_ERROR });

    if (errorStatus) setTimeout(clearError, 8000);

    return (
        <View>
            <Container className={errorStatus ? 'Show' : 'Hide'}>
                <IconButton onClick={clearError}>
                    <i className="material-icons">highlight_off</i>
                </IconButton>
                <Heading>Error</Heading>
                <Message>{errorMessage}</Message>
            </Container>
        </View>
    );
};

export default Error;
