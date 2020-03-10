import React from 'react';
import { Popover, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

const Menu = styled.div`
    background: ${props => props.theme.palette.background.paper};
    color: ${props => props.theme.palette.text.primary};

    .MuiMenuItem-root {
        border: 2px solid ${props => props.theme.palette.background.paper};
    }

    .MuiMenuItem-root:hover {
        border-left: 2px solid ${props => props.theme.palette.secondary.main};
    }
`;

const ListingMenu = ({ menuData, onMenuClose, onEditClick, onDeleteClick }) => {
    const { _id, anchorPosition } = menuData;
    return (
        <Popover
            keepMounted
            id={_id}
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition}
            onClose={onMenuClose}
            open={Boolean(anchorPosition)}
        >
            <Menu>
                <MenuItem onClick={onEditClick}>Edit</MenuItem>
                <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
            </Menu>
        </Popover>
    );
};

export default ListingMenu;
