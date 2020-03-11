import React from 'react';
import { Fab } from '@material-ui/core';
import {
    Listing,
    ListingMenu,
    DeleteModal,
    CreateModal,
    Empty
} from '../components';

class Work extends React.Component {
    constructor(props) {
        super(props);
        const { data, type } = this.props;
        this.state = {
            menuData: {
                anchorPosition: null,
                data: null
            },
            showModal: {
                delete: false,
                edit: false,
                create: false
            },
            data,
            type
        };
    }

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

    handleCreate = () => {
        console.log('created');
        this.handleToggleModal('create')();
    };

    handleEdit = () => {
        console.log('edited');
        this.handleToggleModal('edit')();
    };

    render() {
        const { menuData, showModal, data, type } = this.state;
        const entityData = data[type];

        return (
            <>
                {entityData && entityData.length > 0 && (
                    <>
                        <Listing
                            type={type}
                            showFab
                            data={entityData}
                            onMenuClick={this.handleMenuClick}
                        />
                        <ListingMenu
                            menuData={menuData}
                            onMenuClose={this.handleMenuClose}
                            onEditClick={this.handleToggleModal('edit')}
                            onDeleteClick={this.handleToggleModal('delete')}
                        />
                    </>
                )}
                {(!entityData || entityData.length === 0) && (
                    <Empty
                        actionText="Add Work"
                        action={this.handleToggleModal('create')}
                    />
                )}
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={this.handleToggleModal('create')}
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
                    type={type}
                    onClose={this.handleToggleModal('delete')}
                    onDelete={this.handleDelete}
                />
                <CreateModal
                    show={showModal.create}
                    entity={type}
                    type="create"
                    onClose={this.handleToggleModal('create')}
                    onSuccess={this.handleCreate}
                />
                <CreateModal
                    show={showModal.edit}
                    entity={type}
                    type="edit"
                    data={menuData.data}
                    onClose={this.handleToggleModal('edit')}
                    onSuccess={this.handleEdit}
                />
            </>
        );
    }
}

export default Work;
