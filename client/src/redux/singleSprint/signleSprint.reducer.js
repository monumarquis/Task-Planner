import { SINGLE_SPRINT_ERROR, SINGLE_SPRINT_REQUEST, SINGLE_SPRINT_SUCCESS } from "./signleSprint.types";

const initState = {
    data: {},
    loading: false,
    error: false
};
export const singleSprintReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case SINGLE_SPRINT_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };
        }
        case SINGLE_SPRINT_REQUEST: {

            return {
                ...state,
                data: {},
                loading: true,
                error: false
            };
        }
        case SINGLE_SPRINT_ERROR: {

            return {
                ...state,
                data: {},
                loading: false,
                error: true
            };
        }
        
        default: {
            return state;
        }
    }
};