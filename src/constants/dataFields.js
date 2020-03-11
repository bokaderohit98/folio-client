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
    ]
};
