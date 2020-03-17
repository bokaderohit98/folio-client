import actionsType from './actionsType';
import axios from '../utils/axios';
import apiRoutes from '../constants/apiRoutes';

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
        .catch(err =>
            dispatch({
                type: actionsType.FETCH_USER_ERROR,
                payload: {
                    error: err.response.data.error
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
                    error: err.response.data.error
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
                error: err.response.data.error
            }
        })
    );
};

export default { getUser };
