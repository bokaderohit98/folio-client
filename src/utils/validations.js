const string = minLength => value => {
    if (!value || (value && value.trim().length < minLength))
        return {
            status: true,
            message: `Too short! Must have minimum ${minLength} characters.`
        };
    return { status: false };
};

const email = value => {
    const emailRegExp = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!value || (value && !emailRegExp.test(value.trim())))
        return {
            status: true,
            message: 'Invalid Email'
        };
    return { status: false };
};

const password = value => {
    if (!value || (value && value.trim().length < 8))
        return {
            status: true,
            message: `Too short! Must have minimum 8 characters.`
        };
    return { status: false };
};

const otp = value => {
    if (!value || (value && value.trim().length !== 6))
        return {
            status: true,
            message: 'Invalid Otp'
        };
    return { status: false };
};

const date = value => {
    if (!value)
        return {
            status: true,
            message: 'Missing or Invalid Date'
        };
    return { status: false };
};

const dateRange = (from, to) => {
    if (!from || !to || (from && to && from.valueOf() >= to.valueOf()))
        return {
            status: true,
            message: `Invalid Date Range`
        };
    return { status: false };
};

const select = value => {
    if (!value || (value && !value.trim().length))
        return {
            status: true,
            message: 'Select a Field'
        };
    return { status: false };
};

export default {
    email,
    password,
    otp,
    date,
    dateRange,
    select,
    string
};
