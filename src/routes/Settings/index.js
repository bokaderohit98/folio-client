/* eslint-disable no-case-declarations */
import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import avatar from '../../assets/avatarFemale.png';
import Edit from './Edit';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.palette.background.paper};
    color: ${props => props.theme.palette.text.primary};
`;

const Head = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px;
    margin-top: 32px;

    .MuiAvatar-root,
    .MuiAvatar-img {
        width: 200px;
        height: 200px;
        background: ${props => props.theme.palette.text.primary};
    }

    p {
        font-size: 36px;
        font-weight: 500;
    }
`;

class Settings extends React.Component {
    constructor(props) {
        super(props);
        const { data: user } = this.props;
        this.state = {
            user,
            name: user.name
        };
    }

    handleChange = (type, attribute, operation) => event => {
        const { user } = this.state;
        const updated = { ...user };

        switch (type) {
            case 'date':
                updated[attribute] = event.valueOf();
                break;
            case 'select':
                updated[attribute] = event.target.value;
                break;
            case 'map':
                const updatedMap = [...updated[attribute]];
                if (operation === 'remove') updatedMap.splice(event, 1);
                if (operation === 'add') updatedMap.push(event);
                if (operation === 'update') {
                    const { index, key, value } = event;
                    updatedMap[index][key] = value;
                }
                updated[attribute] = updatedMap;
                break;
            default:
                updated[attribute] = event.target.value;
        }

        this.setState({ user: updated });
    };

    handleUpdate = () => {
        const { user } = this.state;
        const updated = { ...user };
        delete updated.education;
        delete updated.work;
        delete updated.achivement;
        console.log(updated);
    };

    render() {
        const { user, name } = this.state;

        return (
            <Container>
                <Head>
                    <Avatar src={avatar} />
                    <p>{name}</p>
                </Head>
                <Edit
                    data={user}
                    onChange={this.handleChange}
                    onUpdate={this.handleUpdate}
                />
            </Container>
        );
    }
}

export default Settings;
