import React from 'react';
import { Listing } from '../components';

const data = [
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    }
];

const Work = () => {
    return (
        <Listing
            type="work"
            showFab
            data={data}
            fabAction={() => window.alert('Add Work')}
        />
    );
};

export default Work;
