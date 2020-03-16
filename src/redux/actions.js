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
        .catch(err => {
            dispatch({
                type: actionsType.FETCH_USER_ERROR,
                payload: {
                    error: err.response.data.error
                }
            });
        });
};

export default { getUser };
