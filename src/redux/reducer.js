import actionsType from './actionsType';

const initialState = {
    user: {},
    userLoading: false,
    userError: false,
    educations: [],
    works: [],
    achivements: []
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionsType.FETCH_USER_BEGIN:
            return {
                ...state,
                userLoading: true
            };

        case actionsType.FETCH_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: { ...payload.user },
                educations: [...payload.educations],
                works: [...payload.works],
                achivements: [...payload.achivements]
            };

        case actionsType.FETCH_USER_ERROR:
            return {
                ...state,
                userLoading: false,
                userError: payload.error
            };

        default:
            return { ...state };
    }
};

export default rootReducer;
