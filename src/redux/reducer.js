import actionsType from './actionsType';

const initialState = {
    user: {},
    educations: [],
    works: [],
    achivements: [],
    userLoading: false,
    userError: false,
    createEntityLoading: false,
    createEntityError: false,
    updateInfoLoading: false,
    updateInfoError: false
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

        case actionsType.CREATE_ENTITY_BEGIN:
            return {
                ...state,
                createEntityLoading: true,
                createEntityError: false
            };

        case actionsType.CREATE_ENTITY_SUCCESS:
            return {
                ...state,
                createEntityLoading: false,
                [`${payload.entityType}s`]: payload.data
            };

        case actionsType.CREATE_ENTITY_ERROR:
            return {
                ...state,
                createEntityLoading: false,
                createEntityError: true
            };

        case actionsType.DELETE_ENTITY_SUCCESS:
            return {
                ...state,
                [`${payload.entityType}s`]: [
                    ...state[`${payload.entityType}s`]
                ].filter(item => item._id !== payload.id)
            };

        case actionsType.UPDATE_INFO_BEGIN:
            return {
                ...state,
                updateInfoLoading: true,
                updateInfoError: false
            };

        case actionsType.UPDATE_INFO_ERROR:
            return {
                ...state,
                updateInfoLoading: false,
                updateInfoError: payload.error
            };

        case actionsType.UPDATE_INFO_SUCCESS:
            return {
                ...state,
                updateInfoLoading: false,
                user: payload.user
            };
        default:
            return { ...state };
    }
};

export default rootReducer;
