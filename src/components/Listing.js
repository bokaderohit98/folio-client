import React from 'react';
import styled from 'styled-components';
import {
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
    height: 100vh;
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
        box-shadow: ${props => props.theme.shadows[10]};
        max-height: 70vh;
    }
    .MuiTableCell-head,
    .MuiTableCell-body {
        background: ${props => props.theme.palette.background.paper};
        color: ${props => props.theme.palette.text.primary};
    }
`;

const makeTable = (type, data, onMenuClick) => {
    const fields = formFields[type];
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
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
                                <IconButton
                                    color="secondary"
                                    onClick={onMenuClick(row)}
                                >
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

const Listing = ({ type, data, onMenuClick }) => {
    return (
        <Container>
            <Heading>{type.toUpperCase()}</Heading>
            <DataTable>{makeTable(type, data, onMenuClick)}</DataTable>
            <div style={{ height: '80px' }} />
        </Container>
    );
};

export default Listing;
