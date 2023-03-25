import axios from "axios";
import { ALL_SPRINT_TASK_ERROR, ALL_SPRINT_TASK_REQUEST, ALL_SPRINT_TASK_SUCCESS } from "./sprintTask.types";

export const getAllSprintTask = (id) => async (dispatch) => {
    dispatch({
        type: ALL_SPRINT_TASK_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`https://real-lime-cockroach-tutu.cyclic.app/task/allSprint/${id}`,config);
        // console.log(data);
          return dispatch({
            type: ALL_SPRINT_TASK_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: ALL_SPRINT_TASK_ERROR,
            payload: message,
        });

    }
};

