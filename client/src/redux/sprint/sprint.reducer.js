import { ALL_SPRINT_ERROR, ALL_SPRINT_REQUEST, ALL_SPRINT_SUCCESS } from "./sprint.types";

const initState = {
    data: [],
    loading: false,
    error: false
};
export const allSprintReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case ALL_SPRINT_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };
        }
        case ALL_SPRINT_REQUEST: {

            return {
                ...state,
                data: [],
                loading: true,
                error: false
            };
        }
        case ALL_SPRINT_ERROR: {

            return {
                ...state,
                data: [],
                loading: false,
                error: true
            };
        }
        
        default: {
            return state;
        }
    }
};