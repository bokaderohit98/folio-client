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
            type,
            data,
            anchorPosition: null,
            instance: {},
            showModal: {
                delete: false,
                edit: false,
                create: false
            }
        };
    }

    handleMenuClick = data => event => {
        const { clientX: left, clientY: top } = event;
        this.setState({
            anchorPosition: { left, top },
            instance: data
        });
    };

    handleMenuClose = () => {
        this.setState({ anchorPosition: null });
    };

    handleToggleModal = type => () => {
        const { showModal, instance } = this.state;
        const updated = { ...showModal };
        updated[type] = !showModal[type];
        this.setState({
            showModal: updated,
            instance: type === 'create' ? {} : instance
        });
        this.handleMenuClose();
    };

    handleChange = (type, attribute) => event => {
        const { instance } = this.state;
        const updated = { ...instance };
        if (type === 'string' || type === 'long-string') {
            const { value } = event.target;
            updated[attribute] = value;
        } else if (type === 'date') updated[attribute] = event.valueOf();

        this.setState({ instance: updated });
    };

    handleDelete = () => {
        const { menuData } = this.state;
        console.log(menuData.data);
        this.handleToggleModal('delete')();
    };

    handleCreate = () => {
        const { instance } = this.state;
        console.log(instance);
        this.handleToggleModal('create')();
    };

    handleEdit = () => {
        const { instance } = this.state;
        console.log(instance);
        this.handleToggleModal('edit')();
    };

    render() {
        const { showModal, data, type, instance, anchorPosition } = this.state;
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
                            menuData={{ data: instance, anchorPosition }}
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
                    data={instance}
                    onClose={this.handleToggleModal('create')}
                    onSuccess={this.handleCreate}
                    onChange={this.handleChange}
                />
                <CreateModal
                    show={showModal.edit}
                    entity={type}
                    type="edit"
                    data={instance}
                    onClose={this.handleToggleModal('edit')}
                    onSuccess={this.handleEdit}
                    onChange={this.handleChange}
                />
            </>
        );
    }
}

export default Work;
