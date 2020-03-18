import validations from '../utils/validations';

export default {
    education: [
        { name: 'from', type: 'date', required: true },
        { name: 'to', type: 'date', required: true },
        { name: 'institute', type: 'string', required: true },
        { name: 'degree', type: 'string', required: true },
        { name: 'specialization', type: 'string' }
    ],
    work: [
        { name: 'from', type: 'date', required: true },
        { name: 'to', type: 'date', required: true },
        { name: 'organization', type: 'string', required: true },
        { name: 'position', type: 'string', required: true }
    ],
    achivement: [
        { name: 'date', type: 'date', required: true },
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'long-string', required: false }
    ],
    user: [
        { name: 'name', type: 'string', required: true },
        {
            name: 'gender',
            type: 'select',
            required: true,
            choices: ['male', 'female', 'other']
        },
        {
            name: 'dob',
            type: 'date',
            required: true
        },
        {
            name: 'social_handles',
            type: 'map',
            required: false,
            choices: [
                'twitter',
                'facebook',
                'linkedin',
                'instagram',
                'reddit',
                'youtube'
            ],
            signature: { type: '', handle: '' }
        }
    ],
    register: [
        {
            name: 'name',
            type: 'string',
            required: true,
            validation: validations.string(8)
        },
        {
            name: 'email',
            type: 'string',
            required: true,
            validation: validations.email
        },
        {
            name: 'password',
            type: 'password',
            required: true,
            validation: validations.password
        },
        {
            name: 'gender',
            type: 'select',
            required: true,
            choices: ['male', 'female', 'other'],
            validation: validations.select
        },
        {
            name: 'dob',
            type: 'date',
            required: true,
            validation: validations.date
        }
    ],
    loginViaPassword: [
        {
            name: 'email',
            type: 'string',
            required: true,
            validation: validations.email
        },
        {
            name: 'password',
            type: 'password',
            required: true,
            validation: validations.password
        }
    ],
    loginViaOtp: [
        {
            name: 'email',
            type: 'string',
            required: true,
            validation: validations.email
        },
        {
            name: 'otp',
            type: 'string',
            required: true,
            validation: validations.otp
        }
    ]
};
