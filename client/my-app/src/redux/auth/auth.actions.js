import Swal from "sweetalert2"
import axios from "axios";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";
export const LogIn = (creds) => async (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST
    });
console.log(creds);
    try {
        const { data } = await axios.post(`http://localhost:8001/user/login`, creds);
        console.log(data);
       
        Swal.fire({
            icon: 'success',
            title:data.message
          })
          return dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        Swal.fire({
            icon: 'error',
            title:message
          })
        return dispatch({
            type: LOGIN_ERROR,
            payload: message,
        });

    }
};

export const LogOut = () => ({ type: LOGOUT })