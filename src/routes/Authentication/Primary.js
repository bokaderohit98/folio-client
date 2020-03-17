import React from 'react';
import styled from 'styled-components';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    min-width: 240px;

    .MuiTextField-root,
    .MuiFormControl-root {
        margin-bottom: 18px;
        width: 100%;
    }
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 500;
    color: #1144e8;
    margin-bottom: 32px;
`;

const FootNote = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 32px;
    width: 100%;
    font-size: 14px;
`;

const Message = styled.p`
    font-size: 14px;
    margin-top: 12px;
`;

const ButtonGroup = styled.div`
    display: flex;
    padding: 0 16px;
    justify-content: space-around;
    width: 100%;
    margin-top: 32px;
`;

const renderLoginViaPassword = ({
    data,
    loginStatus,
    registerStatus,
    onToggleSubMode,
    onChange,
    onSubmit
}) => {
    return (
        <>
            <Title>Login</Title>
            <TextField
                label="Email"
                required
                disabled={loginStatus.loading}
                value={data.email}
                onChange={onChange('string', 'email')}
            />
            <TextField
                label="Password"
                required
                disabled={loginStatus.loading}
                value={data.password}
                onChange={onChange('string', 'password')}
                type="password"
            />
            <Button
                variant="outlined"
                disabled={loginStatus.loading}
                color="primary"
                style={{ marginTop: '32px' }}
                onClick={onSubmit('loginViaPassword')}
            >
                {loginStatus.loading ? (
                    <ClipLoader size={16} color="#000000" />
                ) : (
                    'Log in'
                )}
            </Button>
            <FootNote>
                Forgot Password?{' '}
                <Button
                    color="primary"
                    disabled={loginStatus.loading}
                    style={{ marginLeft: '12px' }}
                    onClick={onToggleSubMode}
                >
                    Login Via OTP
                </Button>
            </FootNote>
            {registerStatus.success && (
                <Message style={{ marginTop: '16px' }}>
                    Registration Successful! Sit tight we are Logging you in.
                </Message>
            )}
        </>
    );
};

const renderLoginViaOtp = ({
    data,
    getOtpStatus,
    loginStatus,
    onToggleSubMode,
    onGetOtp,
    onChange,
    onSubmit
}) => {
    return (
        <>
            <Title>Login Via OTP</Title>
            <TextField
                label="Email"
                required
                value={data.email}
                disabled={getOtpStatus.loading || loginStatus.loading}
                onChange={onChange('string', 'email')}
            />
            <TextField
                label="OTP"
                required
                value={data.otp}
                disabled={getOtpStatus.loading || loginStatus.loading}
                onChange={onChange('string', 'otp')}
            />
            {getOtpStatus.success && (
                <Message>OTP sent to above mentioned Email</Message>
            )}
            <ButtonGroup>
                <Button
                    variant="outlined"
                    color="secondary"
                    disabled={getOtpStatus.loading || loginStatus.loading}
                    onClick={onGetOtp}
                >
                    {getOtpStatus.loading ? (
                        <ClipLoader size={16} color="#000000" />
                    ) : (
                        'Get Otp'
                    )}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={getOtpStatus.loading || loginStatus.loading}
                    onClick={onSubmit('loginViaOtp')}
                >
                    {loginStatus.loading ? (
                        <ClipLoader size={16} color="#000000" />
                    ) : (
                        'Login'
                    )}
                </Button>
            </ButtonGroup>
            <FootNote>
                <Button
                    color="primary"
                    style={{ marginLeft: '12px' }}
                    disabled={getOtpStatus.loading || loginStatus.loading}
                    onClick={onToggleSubMode}
                >
                    Login Via Password
                </Button>
            </FootNote>
        </>
    );
};

const renderRegister = ({ data, registerStatus, onChange, onSubmit }) => {
    return (
        <>
            <Title>Register</Title>
            <TextField
                label="Name"
                required
                disabled={registerStatus.loading || registerStatus.success}
                value={data.name}
                onChange={onChange('string', 'name')}
            />
            <TextField
                label="Email"
                required
                disabled={registerStatus.loading || registerStatus.success}
                value={data.email}
                onChange={onChange('string', 'email')}
            />
            <TextField
                label="Password"
                required
                disabled={registerStatus.loading || registerStatus.success}
                value={data.password}
                onChange={onChange('string', 'password')}
                type="password"
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    format="DD/MM/YYYY"
                    margin="normal"
                    label="Date of Birth *"
                    disabled={registerStatus.loading || registerStatus.success}
                    value={data.dob ? new Date(Number(data.dob)) : null}
                    onChange={onChange('date', 'dob')}
                />
            </MuiPickersUtilsProvider>
            <FormControl>
                <InputLabel id="gender">Gender *</InputLabel>
                <Select
                    labelId="gender"
                    disabled={registerStatus.loading || registerStatus.success}
                    onChange={onChange('select', 'gender')}
                    value={data.gender}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="outlined"
                disabled={registerStatus.loading || registerStatus.success}
                color="primary"
                style={{ marginTop: '32px' }}
                onClick={onSubmit('register')}
            >
                {registerStatus.loading || registerStatus.success ? (
                    <ClipLoader size={16} color="#000000" />
                ) : (
                    'Sign up'
                )}
            </Button>
        </>
    );
};

const Primary = ({
    mode,
    subMode,
    data,
    getOtpStatus,
    loginStatus,
    registerStatus,
    onToggleSubMode,
    onChange,
    onSubmit,
    onGetOtp
}) => {
    return (
        <Container>
            {mode === 'login' &&
                subMode === 'viaPassword' &&
                renderLoginViaPassword({
                    data: data.loginViaPassword,
                    loginStatus,
                    registerStatus,
                    onToggleSubMode,
                    onChange: onChange('loginViaPassword'),
                    onSubmit
                })}
            {mode === 'login' &&
                subMode === 'viaOTP' &&
                renderLoginViaOtp({
                    data: data.loginViaOtp,
                    getOtpStatus,
                    loginStatus,
                    onToggleSubMode,
                    onChange: onChange('loginViaOtp'),
                    onSubmit,
                    onGetOtp
                })}
            {mode === 'register' &&
                renderRegister({
                    data: data.register,
                    registerStatus,
                    onChange: onChange('register'),
                    onSubmit
                })}
        </Container>
    );
};

export default Primary;
