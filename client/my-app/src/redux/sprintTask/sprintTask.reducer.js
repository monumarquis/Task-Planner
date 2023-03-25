import { ALL_SPRINT_TASK_ERROR, ALL_SPRINT_TASK_REQUEST, ALL_SPRINT_TASK_SUCCESS } from "./sprintTask.types";

const initState = {
    data: [],
    loading: false,
    error: false
};
export const allSprintTaskReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case ALL_SPRINT_TASK_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };
        }
        case ALL_SPRINT_TASK_REQUEST: {

            return {
                ...state,
                data: [],
                loading: true,
                error: false
            };
        }
        case ALL_SPRINT_TASK_ERROR: {

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