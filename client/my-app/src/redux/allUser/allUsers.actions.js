import axios from "axios";
import { ALL_USER_PROFILE_ERROR, ALL_USER_PROFILE_REQUEST, ALL_USER_PROFILE_SUCCESS } from "./allUsers.types";

export const getAllUserProfile = () => async (dispatch) => {
    dispatch({
        type: ALL_USER_PROFILE_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`https://real-lime-cockroach-tutu.cyclic.app/user`,config);
        // console.log(data);
          return dispatch({
            type: ALL_USER_PROFILE_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: ALL_USER_PROFILE_ERROR,
            payload: message,
        });

    }
};

export const getAllUserProfileBySearch = (user) => async (dispatch) => {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`http://localhost:8001/Search/${user}`,config);
        // console.log(data);
          return dispatch({
            type: ALL_USER_PROFILE_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: ALL_USER_PROFILE_ERROR,
            payload: message,
        });

    }
};
