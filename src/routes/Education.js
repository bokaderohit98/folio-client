import React from 'react';
import { Empty } from '../components';

const Education = () => {
    return (
        <Empty
            actionText="Add Education"
            action={() => window.alert('working')}
        />
    );
};

export default Education;
