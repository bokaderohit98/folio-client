/* eslint-disable no-case-declarations */
import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import avatar from '../../assets/avatarFemale.png';
import Edit from './Edit';
import { capitalize } from '../../utils/string';
import { updateInfo } from '../../redux/actions';
import PasswordChangeModal from './PasswordChangeModal';
import dataFields from '../../constants/dataFields';
import validations from '../../utils/validations';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.palette.background.paper};
    color: ${props => props.theme.palette.text.primary};
`;

const PasswordButtonContainer = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
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
        const { user } = this.props;
        this.state = {
            user: { ...user },
            showPasswordChangeModal: false,
            password: '',
            error: {}
        };
    }

    handleChange = (type, attribute, operation) => event => {
        const { user, error } = this.state;
        const updatedError = { ...error };
        const updated = { ...user };

        switch (type) {
            case 'date':
                if (event && event.isValid)
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

        updatedError[attribute] = {};
        this.setState({ user: updated, error: updatedError });
    };

    handleValidations = () => {
        const fields = dataFields.user;
        const { user } = this.state;
        const error = {};

        fields.forEach(({ name, validation }) => {
            if (validation) error[name] = validation(user[name]);
        });

        this.setState({ error });

        const status = Object.keys(error).some(key => error[key].status);
        return status;
    };

    handleUpdate = () => {
        if (this.handleValidations()) return;
        const { user } = this.state;
        const { updateInfo } = this.props;
        updateInfo(user);
    };

    togglePasswordChangeModal = () => {
        const { showPasswordChangeModal } = this.state;
        this.setState({
            showPasswordChangeModal: !showPasswordChangeModal
        });
    };

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    };

    handlePasswordUpdate = () => {
        const { password } = this.state;
        const error = {};

        error.password = validations.password(password);
        this.setState({ error });

        if (error.password.status) return;

        const { updateInfo } = this.props;
        updateInfo({ password }, this.togglePasswordChangeModal);
    };

    render() {
        const {
            user: instance,
            showPasswordChangeModal,
            password,
            error
        } = this.state;
        const { loading, user } = this.props;

        return (
            <Container>
                <PasswordButtonContainer>
                    <IconButton onClick={this.togglePasswordChangeModal}>
                        <i className="material-icons">lock</i>
                    </IconButton>
                </PasswordButtonContainer>
                <Head>
                    <Avatar src={avatar} />
                    <p>{capitalize(user.name)}</p>
                </Head>
                <Edit
                    data={instance}
                    loading={loading}
                    error={error}
                    onChange={this.handleChange}
                    onUpdate={this.handleUpdate}
                />
                <PasswordChangeModal
                    show={showPasswordChangeModal}
                    data={password}
                    disabled={loading}
                    error={error}
                    onChange={this.handlePasswordChange}
                    onUpdate={this.handlePasswordUpdate}
                    onClose={this.togglePasswordChangeModal}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    loading: state.updateInfoLoading,
    error: state.updaeInfoError
});

const mapDispatchToProps = { updateInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
