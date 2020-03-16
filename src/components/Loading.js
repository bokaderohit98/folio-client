import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.palette.background.paper};
`;

const Loading = props => {
    return (
        <Container>
            <HashLoader loading size={80} />
        </Container>
    );
};

export default Loading;
