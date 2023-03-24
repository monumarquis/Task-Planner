import { MY_TASK_ERROR, MY_TASK_REQUEST, MY_TASK_SUCCESS } from "./myTask.types";
import axios from "axios";

export const getAllMyTask = () => async (dispatch) => {
    dispatch({
        type: MY_TASK_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`https://real-lime-cockroach-tutu.cyclic.app/task`,config);
        console.log(data);
          return dispatch({
            type: MY_TASK_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: MY_TASK_ERROR,
            payload: message,
        });

    }
};

