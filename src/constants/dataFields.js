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
        { name: 'year', type: 'date', required: true },
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'long-string', required: false }
    ],
    user: [
        { name: 'name', type: 'string', required: true },
        { name: 'email', type: 'email', required: true },
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
    ]
};
