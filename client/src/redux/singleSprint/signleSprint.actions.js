import axios from "axios";
import { SINGLE_SPRINT_ERROR, SINGLE_SPRINT_REQUEST, SINGLE_SPRINT_SUCCESS } from "./signleSprint.types";

export const getSingleSprint = (id) => async (dispatch) => {
    dispatch({
        type: SINGLE_SPRINT_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`https://real-lime-cockroach-tutu.cyclic.app/sprint/${id}`, config);
        // console.log(data);
        return dispatch({
            type: SINGLE_SPRINT_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: SINGLE_SPRINT_ERROR,
            payload: message,
        });

    }
};

