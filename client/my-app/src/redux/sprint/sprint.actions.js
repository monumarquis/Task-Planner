import axios from "axios";
import { ALL_SPRINT_ERROR, ALL_SPRINT_REQUEST, ALL_SPRINT_SUCCESS } from "./sprint.types";

export const getAllSprint = () => async (dispatch) => {
    dispatch({
        type: ALL_SPRINT_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`http://localhost:8001/sprint`,config);
        // console.log(data);
          return dispatch({
            type: ALL_SPRINT_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: ALL_SPRINT_ERROR,
            payload: message,
        });

    }
};

