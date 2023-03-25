import { MY_TASK_ERROR, MY_TASK_REQUEST, MY_TASK_SUCCESS } from "./myTask.types";

const initState = {
    myTaskData: [],
    assignedData: [],
    loading: false,
    error: false
};
export const myTaskReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case MY_TASK_SUCCESS: {
            return {
                ...state,
                myTaskData: payload.myTask,
                assignedData: payload.assignedtask,
                loading: false,
                error: false
            };
        }
        case MY_TASK_REQUEST: {

            return {
                ...state,
                myTaskData: [],
                assignedData: [],
                loading: true,
                error: false
            };
        }
        case MY_TASK_ERROR: {

            return {
                ...state,
                myTaskData: [],
                assignedData: [],
                loading: false,
                error: true
            };
        }

        default: {
            return state;
        }
    }
};