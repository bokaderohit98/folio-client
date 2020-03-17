import React from 'react';
import { Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import { createEntity } from '../../redux/actions';

import Empty from './Empty';
import Listing from './Listing';
import ListingMenu from './ListingMenu';
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';

class Entity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleCreateEdit = requestType => () => {
        const { instance } = this.state;
        const { createEntity, type } = this.props;
        createEntity(
            requestType,
            type,
            instance,
            this.handleToggleModal(requestType)
        );
    };

    render() {
        const { showModal, instance, anchorPosition } = this.state;
        const { data, type, createEntityLoading } = this.props;
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
                        actionText={`add ${type}`}
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
                    loading={createEntityLoading}
                    onClose={this.handleToggleModal('create')}
                    onSuccess={this.handleCreateEdit('create')}
                    onChange={this.handleChange}
                />
                <CreateModal
                    show={showModal.edit}
                    entity={type}
                    type="edit"
                    data={instance}
                    loading={createEntityLoading}
                    onClose={this.handleToggleModal('edit')}
                    onSuccess={this.handleCreateEdit('edit')}
                    onChange={this.handleChange}
                />
            </>
        );
    }
}

const mapStateToProps = state => ({
    data: {
        education: state.educations,
        work: state.works,
        achivement: state.achivements
    },
    createEntityLoading: state.createEntityLoading,
    createEntityError: state.createEntityError
});

const mapDispatchToProps = { createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
