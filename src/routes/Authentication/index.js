/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import Primary from './Primary';
import Secondary from './Secondary';

import api from '../../api';
import dataFields from '../../constants/dataFields';
import ToggleMode from './ToggleMode';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
    position: relative;

    @media (min-width: 769px) {
        .SecondaryRight {
            transform: translateX(0);
        }

        .SecondaryLeft {
            transform: translateX(-100%);
        }

        .PrimaryLeft {
            transform: translateX(0);
        }

        .PrimaryRight {
            transform: translateX(100%);
        }
    }
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    border-color: transparent transparent #1144e8 transparent;
    border-width: 0 100px 100vh 0;
    display: none;
    box-sizing: border-box;

    @media (max-width: 768px) {
        display: block;
    }
`;

const PrimaryContainer = styled.div`
    display: flex;
    width: 50%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
        background: transparent;
        padding-bottom: 56px;
    }
`;

const SecondaryContainer = styled.div`
    display: flex;
    width: 50%;
    min-height: 100vh;
    transition: 0.3s all;

    .Left {
        -webkit-box-ordinal-group: 1;
        -moz-box-ordinal-group: 1;
        -ms-flex-order: 1;
        -webkit-order: 1;
        order: 1;
    }

    .Right {
        -webkit-box-ordinal-group: 2;
        -moz-box-ordinal-group: 2;
        -ms-flex-order: 2;
        -webkit-order: 2;
        order: 2;
    }

    .LeftBorder {
        border-width: 100vh 0 0 100px;
        border-color: #1144e8 transparent transparent transparent;
    }

    .RightBorder {
        border-width: 0 100px 100vh 0;
        border-color: transparent transparent #1144e8 transparent;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const SecondaryContent = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #1144e8;
    box-shadow: 1px 1px #1144e8;
`;

const SecondaryBorder = styled.div`
    border-style: solid;
`;

class Authentication extends React.Component {
    state = {
        mode: 'login',
        subMode: 'viaPassword',
        data: {
            register: {
                name: '',
                email: '',
                password: '',
                gender: '',
                dob: ''
            },
            loginViaPassword: {
                email: '',
                password: ''
            },
            loginViaOtp: {
                email: '',
                otp: ''
            }
        },
        getOtpStatus: {
            loading: false,
            error: false,
            success: false
        },
        loginStatus: {
            loading: false,
            error: false
        },
        registerStatus: {
            loading: false,
            error: false,
            success: false
        },
        error: {}
    };

    componentDidMount() {
        const query = new URLSearchParams(browserHistory.location.search);
        const token = query.get('token');
        if (token) auth.login(token);
    }

    handleToggleMode = () => {
        const { mode } = this.state;
        this.setState({
            mode: mode === 'login' ? 'register' : 'login',
            error: {}
        });
    };

    handleToggleSubMode = () => {
        const { subMode } = this.state;
        this.setState({
            subMode: subMode === 'viaPassword' ? 'viaOTP' : 'viaPassword',
            error: {}
        });
    };

    handleChange = entity => (type, attribute) => event => {
        const { data, error } = this.state;
        const updatedError = { ...error };
        const updatedData = { ...data };

        if (type === 'string')
            updatedData[entity][attribute] = event.target.value;
        else if (type === 'date')
            updatedData[entity][attribute] = event ? event.valueOf() : '';
        else if (type === 'select')
            updatedData[entity][attribute] = event.target.value;

        updatedError[attribute] = {};
        this.setState({ data: updatedData, error: updatedError });
    };

    handleGetOtp = () => {
        const { data, getOtpStatus } = this.state;

        const error = {};
        error.email = dataFields.loginViaOtp[0].validation(
            data.loginViaOtp.email
        );

        this.setState({ error });

        if (error.email.status) return;

        this.setState({
            getOtpStatus: {
                ...getOtpStatus,
                loading: true,
                error: false,
                success: false
            }
        });
        api.getOtp(
            { email: data.loginViaOtp.email },
            () =>
                this.setState({
                    getOtpStatus: {
                        ...getOtpStatus,
                        loading: false,
                        success: true
                    }
                }),
            error =>
                this.setState({
                    getOtpStatus: {
                        ...getOtpStatus,
                        loading: false,
                        error: true
                    },
                    error
                })
        );
    };

    handleValidation = type => {
        const fields = dataFields[type];
        let data = this.state.data[type];
        const error = {};

        fields.forEach(({ name, validation }) => {
            error[name] = validation(data[name]);
        });

        const status = Object.keys(error).some(key => error[key].status);
        this.setState({ error });

        return status;
    };

    handleSubmit = type => () => {
        if (this.handleValidation(type)) return;

        const { data } = this.state;

        const onSuccessRegister = credentials =>
            this.setState({
                mode: 'login',
                subMode: 'viaPassword',
                data: {
                    ...data,
                    loginViaPassword: {
                        email: credentials.email,
                        password: credentials.password
                    }
                },
                registerStatus: {
                    loading: false,
                    error: false,
                    success: true
                },
                loginStatus: {
                    loading: true,
                    error: false
                }
            });

        const onFailureLogin = error =>
            this.setState({
                loginStatus: {
                    loading: false,
                    error: true
                },
                error
            });

        const onFailureRegister = error =>
            this.setState({
                registerStatus: { loading: false, error: true },
                error
            });

        if (type === 'loginViaPassword' || type === 'loginViaOtp')
            this.setState({
                loginStatus: {
                    loading: true,
                    error: false
                }
            });
        else
            this.setState({
                registerStatus: {
                    loading: true,
                    error: false,
                    success: false
                }
            });

        if (type === 'loginViaPassword')
            api.loginViaPassword(data.loginViaPassword, onFailureLogin);
        else if (type === 'loginViaOtp')
            api.loginViaOtp(data.loginViaOtp, onFailureLogin);
        else
            api.register(
                data.register,
                onSuccessRegister,
                onFailureRegister,
                onFailureLogin
            );
    };

    getClasses = () => {
        const { mode } = this.state;
        if (mode === 'login')
            return [
                'PrimaryLeft',
                'SecondaryRight',
                'Right',
                'Left',
                'LeftBorder'
            ];
        return [
            'PrimaryRight',
            'SecondaryLeft',
            'Left',
            'Right',
            'RightBorder'
        ];
    };

    render() {
        const [
            primaryClass,
            secondaryClass,
            secondaryContentClass,
            secondaryBorderPositionClass,
            secondaryBorderStyleClass
        ] = this.getClasses();

        const {
            mode,
            subMode,
            data,
            getOtpStatus,
            loginStatus,
            registerStatus,
            error
        } = this.state;

        return (
            <>
                <Background />
                <Container>
                    <PrimaryContainer className={primaryClass}>
                        <Primary
                            mode={mode}
                            subMode={subMode}
                            data={data}
                            getOtpStatus={getOtpStatus}
                            loginStatus={loginStatus}
                            registerStatus={registerStatus}
                            error={error}
                            onToggleSubMode={this.handleToggleSubMode}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            onGetOtp={this.handleGetOtp}
                        />
                    </PrimaryContainer>
                    <SecondaryContainer className={secondaryClass}>
                        <SecondaryContent className={secondaryContentClass}>
                            <Secondary
                                mode={mode}
                                disabled={
                                    getOtpStatus.loading ||
                                    loginStatus.loading ||
                                    registerStatus.loading ||
                                    registerStatus.success
                                }
                                onToggleMode={this.handleToggleMode}
                            />
                        </SecondaryContent>
                        <SecondaryBorder
                            className={[
                                secondaryBorderPositionClass,
                                secondaryBorderStyleClass
                            ].join(' ')}
                        />
                    </SecondaryContainer>
                    <ToggleMode
                        mode={mode}
                        onToggleMode={this.handleToggleMode}
                    />
                </Container>
            </>
        );
    }
}

export default Authentication;
