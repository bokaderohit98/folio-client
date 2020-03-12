const work = [
    {
        _id: '1',
        from: '1583855126172',
        to: '1583121212125',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '2',
        from: '1583855126172',
        to: '1583121212125',
        organization: 'Amazon',
        position: 'Software Developer'
    },
    {
        _id: '3',
        from: '1583855126172',
        to: '1583121212125',
        organization: 'Heroku',
        position: 'Software Developer'
    },
    {
        _id: '8',
        from: '1583855126172',
        to: '1583121212125',
        organization: 'American Express',
        position: 'Software Developer'
    },
    {
        _id: '9',
        from: '1583855126172',
        to: '1583121212125',
        organization: 'Innovaccer',
        position: 'Product Intern'
    },
    {
        _id: '10',
        from: '1583855126172',
        to: '1583121212125',
        organization: 'Samsung',
        position: 'Analyst'
    }
];

const education = [
    {
        _id: '1',
        from: '1583855126172',
        to: '1583121212125',
        institute: 'NSIT',
        degree: 'B.E',
        specialization: 'Computer Engineering'
    },
    {
        _id: '2',
        from: '1583855126172',
        to: '1583121212125',
        institute: 'TITS',
        degree: 'M.B.A'
    },
    {
        _id: '3',
        from: '1583855126172',
        to: '1583121212125',
        institute: 'CBSE',
        degree: 'Higher Secondary School Certificate'
    },
    {
        _id: '4',
        from: '1583855126172',
        to: '1583121212125',
        institute: 'CBSE',
        degree: 'Senior Secondary School Certificate',
        specialization: 'Computer Engineering'
    },
    {
        _id: '5',
        from: '1583855126172',
        to: '1583121212125',
        institute: 'Munna Institute of Technology',
        degree: 'M.S',
        specialization: 'Computer Engineering'
    }
];

const achivement = [
    {
        _id: '1',
        year: '1583855126172',
        title: 'Best Intern',
        description:
            'This is shit as fuck and ikdf fjkdf dfjkdsjfdf fsjkfkd  jkdsfkj'
    },
    {
        _id: '1',
        year: '1583855126172',
        title: 'Employe of Year'
    },
    {
        _id: '1',
        year: '1583855126172',
        title: 'State Topper in HSSC',
        description:
            'This is shit as fuck and ikdf fjkdf dfjkdsjfdf fsjkfkd  jkdsfkj'
    }
];

const user = {
    name: 'rohit bokade',
    dob: '0000000000000',
    email: 'bokaderohit98',
    gender: 'male',
    social_handles: [
        { type: 'twitter', handle: 'yelloveAddict' },
        { type: 'facebook', handle: 'bokaderohit98' },
        { type: 'reddit', handle: 'iamRohit' }
    ]
};

export default {
    work,
    education,
    achivement,
    ...user
};
