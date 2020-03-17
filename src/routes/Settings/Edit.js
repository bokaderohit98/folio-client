import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import ClipLoader from 'react-spinners/ClipLoader';
import makeFormFields from '../../utils/makeFormFields';

const Container = styled.div`
    padding: 32px;
    background: ${props => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Edit = ({ data, loading, onChange, onUpdate }) => {
    return (
        <Container>
            {makeFormFields({ entity: 'user', data, loading, onChange })}
            <Button
                color="primary"
                disabled={loading}
                variant="contained"
                style={{ marginTop: '32px' }}
                onClick={onUpdate}
            >
                {loading ? <ClipLoader size={16} color="#ffffff" /> : 'Update'}
            </Button>
        </Container>
    );
};

export default Edit;
