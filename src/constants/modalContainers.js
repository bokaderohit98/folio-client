import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: transparent;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px;
    width: 320px;
    border-radius: 4px;
    background: ${props => props.theme.palette.background.paper};
    box-shadow: ${props => props.theme.shadows[6]};
    color: ${props => props.theme.palette.text.primary};
    z-index: 1001;
`;

export const Title = styled.p`
    font-size: 20px;
    padding: 0;
    margin: 0;
`;

export const Subtitle = styled.p`
    font-size: 14px;
    color: ${props => props.theme.palette.error.main};
`;

export const Action = styled.div`
    display: flex;
    margin-top: 16px;
`;
