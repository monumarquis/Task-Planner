import axios from "axios";
import { ALL_TASK_ERROR, ALL_TASK_REQUEST, ALL_TASK_SUCCESS } from "./allTask.types";

export const getAllTask = (id) => async (dispatch) => {
    dispatch({
        type: ALL_TASK_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`https://real-lime-cockroach-tutu.cyclic.app/task/all-task`,config);
        // console.log(data);
          return dispatch({
            type: ALL_TASK_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: ALL_TASK_ERROR,
            payload: message,
        });

    }
};

