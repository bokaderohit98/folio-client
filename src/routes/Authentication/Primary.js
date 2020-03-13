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

const ButtonGroup = styled.div`
    display: flex;
    padding: 0 16px;
    justify-content: space-around;
    width: 100%;
    margin-top: 32px;
`;

const renderLoginViaPassword = ({
    data,
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
                value={data.email}
                onChange={onChange('string', 'email')}
            />
            <TextField
                label="Password"
                required
                value={data.password}
                onChange={onChange('string', 'password')}
                type="password"
            />
            <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: '32px' }}
                onClick={onSubmit('loginViaPassword')}
            >
                Log in
            </Button>
            <FootNote>
                Forgot Password?{' '}
                <Button
                    color="primary"
                    style={{ marginLeft: '12px' }}
                    onClick={onToggleSubMode}
                >
                    Login Via OTP
                </Button>
            </FootNote>
        </>
    );
};

const renderLoginViaOtp = ({
    data,
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
                onChange={onChange('string', 'email')}
            />
            <TextField
                label="OTP"
                required
                value={data.otp}
                onChange={onChange('string', 'otp')}
            />
            <ButtonGroup>
                <Button variant="outlined" color="secondary" onClick={onGetOtp}>
                    Get Otp
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onSubmit('loginViaOtp')}
                >
                    Log in
                </Button>
            </ButtonGroup>
            <FootNote>
                <Button
                    color="primary"
                    style={{ marginLeft: '12px' }}
                    onClick={onToggleSubMode}
                >
                    Login Via Password
                </Button>
            </FootNote>
        </>
    );
};

const renderRegister = ({ data, onChange, onSubmit }) => {
    return (
        <>
            <Title>Register</Title>
            <TextField
                label="Name"
                required
                value={data.name}
                onChange={onChange('string', 'name')}
            />
            <TextField
                label="Email"
                required
                value={data.email}
                onChange={onChange('string', 'email')}
            />
            <TextField
                label="Password"
                required
                value={data.password}
                onChange={onChange('string', 'password')}
                type="password"
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    format="DD/MM/YYYY"
                    margin="normal"
                    label="Date of Birth *"
                    value={data.dob ? new Date(Number(data.dob)) : null}
                    onChange={onChange('date', 'dob')}
                />
            </MuiPickersUtilsProvider>
            <FormControl>
                <InputLabel id="gender">Gender *</InputLabel>
                <Select
                    labelId="gender"
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
                color="primary"
                style={{ marginTop: '32px' }}
                onClick={onSubmit('register')}
            >
                Sign up
            </Button>
        </>
    );
};

const Primary = ({
    mode,
    subMode,
    data,
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
                    onToggleSubMode,
                    onChange: onChange('loginViaPassword'),
                    onSubmit
                })}
            {mode === 'login' &&
                subMode === 'viaOTP' &&
                renderLoginViaOtp({
                    data: data.loginViaOtp,
                    onToggleSubMode,
                    onChange: onChange('loginViaOtp'),
                    onSubmit,
                    onGetOtp
                })}
            {mode === 'register' &&
                renderRegister({
                    data: data.register,
                    onChange: onChange('register'),
                    onSubmit
                })}
        </Container>
    );
};

export default Primary;
