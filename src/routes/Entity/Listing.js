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
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import dataFields from '../../constants/dataFields';
import { getDate } from '../../utils/date';

const Container = styled.div`
    padding: 0;
    min-height: 100vh;
    background: ${props => props.theme.palette.background.paper};

    @media (max-width: 768px) {
        padding-top: 48px;
    }
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
        box-shadow: ${props => props.theme.shadows[5]};
        background: ${props => props.theme.palette.background.paper};
    }
    .MuiTableCell-head,
    .MuiTableCell-body {
        background: ${props => props.theme.palette.background.paper};
        color: ${props => props.theme.palette.text.primary};
        border-color: ${props => props.theme.palette.background.default};
    }
`;

const makeTable = (type, data, onMenuClick) => {
    const fields = dataFields[type];
    return (
        <TableContainer component={Paper}>
            <ScrollBar>
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
                                {fields.map(({ name, type }) => (
                                    <TableCell key={name}>
                                        {type === 'date' && row[name]
                                            ? getDate(row[name])
                                            : row[name] || '-'}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        color="secondary"
                                        onClick={onMenuClick(row)}
                                    >
                                        <i className="material-icons">
                                            more_vert
                                        </i>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollBar>
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
