import React from 'react';
import styled from 'styled-components';
import {
    Fab,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper
} from '@material-ui/core';

import formFields from '../constants/formFields';

const Container = styled.div`
    padding: 0;
    background: ${props => props.theme.palette.background.paper};
`;

const Heading = styled.h1`
    display: flex;
    justify-content: center;
    margin: 0;
    padding-top: 32px;
    margin-bottom: 32px;
    color: ${props => props.theme.palette.text.primary};
`;

const DataTable = styled.div`
    padding: 0 12px;
    .MuiTableContainer-root {
        background: ${props => props.theme.palette.background.paper};
        box-shadow: ${props => props.theme.shadows[10]};
    }
    .MuiTableCell-head,
    .MuiTableCell-body {
        color: ${props => props.theme.palette.text.primary};
    }
`;

const makeTable = (type, data) => {
    const fields = formFields[type];
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {fields.map(({ name }) => (
                            <TableCell key={name}>
                                {name.toUpperCase()}
                            </TableCell>
                        ))}
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                        <TableRow key={Math.random()}>
                            {fields.map(({ name }) => (
                                <TableCell key={name}>
                                    {row[name] || '-'}
                                </TableCell>
                            ))}
                            <TableCell>
                                <IconButton color="secondary">
                                    <i className="material-icons">more_vert</i>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow />
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Listing = ({ type, data, showFab, fabAction }) => {
    return (
        <Container>
            <Heading>{type.toUpperCase()}</Heading>
            <DataTable>{makeTable(type, data)}</DataTable>
            <div style={{ height: '100px' }} />
            {showFab && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={fabAction}
                    style={{
                        position: 'fixed',
                        bottom: '12px',
                        right: '12px'
                    }}
                >
                    <i className="material-icons">add</i>
                </Fab>
            )}
        </Container>
    );
};

export default Listing;
