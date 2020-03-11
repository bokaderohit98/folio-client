import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import makeFormFields from '../../utils/makeFormFields';

const Container = styled.div`
    padding: 32px;
    background: ${props => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Edit = ({ data, onChange, onUpdate }) => {
    return (
        <Container>
            {makeFormFields({ entity: 'user', data, onChange })}
            <Button
                color="primary"
                variant="contained"
                style={{ marginTop: '32px' }}
                onClick={onUpdate}
            >
                Update
            </Button>
        </Container>
    );
};

export default Edit;
