import validations from '../utils/validations';

export default {
    education: [
        {
            name: 'from',
            type: 'date',
            required: true,
            validaton: validations.date
        },
        {
            name: 'to',
            type: 'date',
            required: true,
            validation: validations.date
        },
        {
            name: 'institute',
            type: 'string',
            required: true,
            validation: validations.string(3)
        },
        {
            name: 'degree',
            type: 'string',
            required: true,
            validation: validations.string(2)
        },
        { name: 'specialization', type: 'string' }
    ],
    work: [
        {
            name: 'from',
            type: 'date',
            required: true,
            validation: validations.date
        },
        {
            name: 'to',
            type: 'date',
            required: true,
            validation: validations.date
        },
        {
            name: 'organization',
            type: 'string',
            required: true,
            validation: validations.string(3)
        },
        {
            name: 'position',
            type: 'string',
            required: true,
            validation: validations.string(2)
        }
    ],
    achivement: [
        {
            name: 'date',
            type: 'date',
            required: true,
            validation: validations.date
        },
        {
            name: 'title',
            type: 'string',
            required: true,
            validation: validations.string(5)
        },
        { name: 'description', type: 'long-string', required: false }
    ],
    user: [
        {
            name: 'name',
            type: 'string',
            required: true,
            validation: validations.string(3)
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
