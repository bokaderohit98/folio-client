import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    opacity: 0.7;
    background: ${props => props.theme.palette.grey.A700};
`;

const Overlay = () => {
    return <Container />;
};

export default Overlay;
