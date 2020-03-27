/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Switch, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import routes from '../constants/routes';

const Container = styled.div`
    width: 240px;
    background: ${props => props.theme.palette.background.paper};
    border: ${props => {
        console.log(props.theme);
    }};
    box-shadow: ${props => props.theme.shadows[6]};
    z-index: 10;
    position: fixed;
    left: 0px;
    top: 0px;
    overflow: auto;
`;

const Content = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const HeaderContainer = styled.div`
    height: 280px;
`;

const Background = styled.div`
    height: 120px;
    background: ${props => props.theme.palette.primary.main};
`;

const AvatarContainer = styled.div`
    background: white;
    position: absolute;
    left: 80px;
    top: 80px;
    border-radius: 40px;

    .MuiAvatar-root {
        background: ${props => props.theme.palette.text.primary};
        height: 80px;
        width: 80px;
    }
`;

const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 80px;

    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

const RouteLink = styled(Link)`
    padding: 14px 28px;
    font-size: 18px;
    text-decoration: none;
    color: ${props => props.theme.palette.text.primary};
    :hover {
        background: ${props => props.theme.palette.action.hover};
    }
`;

const OtherLink = styled.div`
    padding: 14px 28px;
    font-size: 18px;
    color: ${props => props.theme.palette.text.primary};
    justify-self: flex-end;
    cursor: pointer;
    :hover {
        background: ${props => props.theme.palette.action.hover};
    }
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const makeMenu = verified => {
    return routes
        .filter(({ listedOnSidebar }) => listedOnSidebar)
        .map(({ title, path, verificationRequired }) => (
            <RouteLink
                to={path}
                key={title}
                className={verificationRequired && !verified && 'disabled'}
            >
                {title}
            </RouteLink>
        ));
};

const Sidebar = ({ darkMode, toggleDarkMode }) => {
    const user = useSelector(state => state.user);
    return (
        <Container>
            <ScrollBar>
                <Content>
                    <HeaderContainer>
                        <Background />
                        <AvatarContainer>
                            <Avatar
                                src={`/images/${
                                    user && user.avatar
                                        ? user.avatar
                                        : 'avatarOther.png'
                                }`}
                            />
                        </AvatarContainer>
                    </HeaderContainer>
                    <LinksContainer>{makeMenu(user.verified)}</LinksContainer>
                    <OtherLink>
                        Dark Mode{' '}
                        <Switch checked={darkMode} onChange={toggleDarkMode} />
                    </OtherLink>
                    <OtherLink onClick={auth.logout}>Logout</OtherLink>
                </Content>
            </ScrollBar>
        </Container>
    );
};

export default Sidebar;
