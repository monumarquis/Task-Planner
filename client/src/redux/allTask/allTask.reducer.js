import { ALL_TASK_ERROR, ALL_TASK_REQUEST, ALL_TASK_SUCCESS } from "./allTask.types";

const initState = {
    data: [],
    loading: false,
    error: false
};
export const allTaskReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case ALL_TASK_SUCCESS: {
            return {
                ...state,
                data: payload.myTask,
                loading: false,
                error: false
            };
        }
        case ALL_TASK_REQUEST: {

            return {
                ...state,
                data: [],
                loading: true,
                error: false
            };
        }
        case ALL_TASK_ERROR: {

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