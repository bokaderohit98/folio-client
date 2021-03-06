import actionsType from './actionsType';
import axios from '../utils/axios';
import apiRoutes from '../constants/apiRoutes';
import errorHandler from '../utils/errorHandler';

export const getUser = () => dispatch => {
    dispatch({
        type: actionsType.FETCH_USER_BEGIN
    });

    axios
        .get(apiRoutes.getUser)
        .then(res => {
            const user = res.data;
            const educations = [...user.educations];
            const works = [...user.works];
            const achivements = [...user.achivements];

            delete user.educations;
            delete user.works;
            delete user.achivements;

            dispatch({
                type: actionsType.FETCH_USER_SUCCESS,
                payload: {
                    user,
                    educations,
                    works,
                    achivements
                }
            });
        })
        // eslint-disable-next-line no-undef
        .catch(err => auth.logout());
};

export const updateInfo = (data, onSuccess) => dispatch => {
    dispatch({
        type: actionsType.UPDATE_INFO_BEGIN
    });

    axios
        .put(apiRoutes.updateInfo, data)
        .then(res => {
            if (onSuccess) {
                onSuccess();
            }
            return dispatch({
                type: actionsType.UPDATE_INFO_SUCCESS,
                payload: {
                    user: res.data
                }
            });
        })
        .catch(err =>
            dispatch({
                type: actionsType.UPDATE_INFO_ERROR,
                payload: {
                    error: errorHandler(err)
                }
            })
        );
};

export const createEntity = (
    requestType,
    entityType,
    data,
    successHandler
) => dispatch => {
    dispatch({
        type: actionsType.CREATE_ENTITY_BEGIN
    });

    let request = null;

    if (requestType === 'edit')
        request = axios.put(apiRoutes.createEntity(entityType, data._id), data);
    else request = axios.post(apiRoutes.createEntity(entityType), data);

    request
        .then(res => {
            successHandler();
            return dispatch({
                type: actionsType.CREATE_ENTITY_SUCCESS,
                payload: {
                    entityType,
                    data: res.data
                }
            });
        })
        .catch(err =>
            dispatch({
                type: actionsType.CREATE_ENTITY_ERROR,
                payload: {
                    error: errorHandler(err)
                }
            })
        );
};

export const deleteEntity = (entityType, data) => dispatch => {
    dispatch({
        type: actionsType.DELETE_ENTITY_SUCCESS,
        payload: {
            entityType,
            id: data._id
        }
    });
    axios.delete(apiRoutes.deleteEntity(entityType, data._id)).catch(err =>
        dispatch({
            type: actionsType.DELETE_ENTITY_ERROR,
            payload: {
                error: errorHandler(err),
                entityType,
                id: data._id
            }
        })
    );
};

export default { getUser };
