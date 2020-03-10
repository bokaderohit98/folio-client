import React from 'react';
import { Fab } from '@material-ui/core';
import { Listing, ListingMenu, DeleteModal } from '../components';

const data = [
    {
        _id: '1',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '2',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '3',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '4',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '5',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '6',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '7',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '8',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '9',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    },
    {
        _id: '10',
        from: '26 November 2012',
        to: '33 December 2011',
        organization: 'Innovaccer',
        position: 'Software Developer'
    }
];

class Work extends React.Component {
    state = {
        menuData: {
            anchorPosition: null,
            data: null
        },
        showModal: {
            delete: false,
            edit: false,
            create: false
        }
    };

    handleFabClick = () => {
        console.log('Fab Clicked');
    };

    handleMenuClick = data => event => {
        const { clientX: left, clientY: top } = event;
        this.setState({
            menuData: {
                anchorPosition: { left, top },
                data
            }
        });
    };

    handleMenuClose = () => {
        const { menuData } = this.state;
        const updated = { ...menuData };
        updated.anchorPosition = null;
        this.setState({ menuData: updated });
    };

    handleToggleModal = type => () => {
        const { showModal } = this.state;
        const updated = { ...showModal };
        updated[type] = !showModal[type];
        this.setState({ showModal: updated });
        this.handleMenuClose();
    };

    handleDelete = () => {
        const { menuData } = this.state;
        console.log(menuData.data);
        this.handleToggleModal('delete')();
    };

    render() {
        const { menuData, showModal } = this.state;
        return (
            <>
                <Listing
                    type="work"
                    showFab
                    data={data}
                    onMenuClick={this.handleMenuClick}
                />
                <ListingMenu
                    menuData={menuData}
                    onMenuClose={this.handleMenuClose}
                    onEditClick={this.handleToggleModal('edit')}
                    onDeleteClick={this.handleToggleModal('delete')}
                />
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={this.handleFabClick}
                    style={{
                        position: 'fixed',
                        bottom: '12px',
                        right: '12px'
                    }}
                >
                    <i className="material-icons">add</i>
                </Fab>
                <DeleteModal
                    show={showModal.delete}
                    onClose={this.handleToggleModal('delete')}
                    onDelete={this.handleDelete}
                />
            </>
        );
    }
}

export default Work;
