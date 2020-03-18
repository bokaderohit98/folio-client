import React from 'react';
import { Fab } from '@material-ui/core';
import { connect } from 'react-redux';

import { createEntity, deleteEntity } from '../../redux/actions';
import Empty from './Empty';
import Listing from './Listing';
import ListingMenu from './ListingMenu';
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';
import dataFields from '../../constants/dataFields';

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
            },
            error: {}
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
        const { instance, error } = this.state;
        const updatedError = { ...error };
        const updated = { ...instance };
        if (type === 'string' || type === 'long-string') {
            const { value } = event.target;
            updated[attribute] = value;
        } else if (type === 'date') updated[attribute] = event.valueOf();

        updatedError[attribute] = {};
        this.setState({ instance: updated, error: updatedError });
    };

    handleDelete = () => {
        const { instance } = this.state;
        const { type, deleteEntity } = this.props;
        deleteEntity(type, instance);
        this.handleToggleModal('delete')();
    };

    handleValidation = () => {
        const { type } = this.props;
        const { instance } = this.state;
        const fields = dataFields[type];
        const error = {};

        fields.forEach(({ name, validation }) => {
            if (validation && (name === 'from' || name === 'to'))
                error[name] = validation(instance.from, instance.to);
            else if (validation) error[name] = validation(instance[name]);
        });

        let status = Object.keys(error).some(key => error[key].status);

        this.setState({ error });

        return status;
    };

    handleCreateEdit = requestType => () => {
        if (this.handleValidation()) return;

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
        const { showModal, instance, anchorPosition, error } = this.state;
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
                    error={error}
                    onClose={this.handleToggleModal('create')}
                    onSuccess={this.handleCreateEdit('create')}
                    onChange={this.handleChange}
                />
                <CreateModal
                    show={showModal.edit}
                    entity={type}
                    type="edit"
                    data={instance}
                    error={error}
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

const mapDispatchToProps = { createEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
