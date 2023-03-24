import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";

let token = localStorage.getItem("token")

const initState = {
    isAuth: !!token,
    token,
    role: localStorage.getItem("role"),
    loading: false,
    error: false
};
export const authReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem("token", payload.token)
            localStorage.setItem("role", payload.role)
            return {
                ...state,
                isAuth: true,
                token: payload.token,
                role: payload.role,
                loading: false,
                error: false
            };
        }
        case LOGIN_REQUEST: {

            return {
                ...state,
                isAuth: false,
                token: "",
                role: "",
                loading: true,
                error: false
            };
        }
        case LOGIN_ERROR: {

            return {
                ...state,
                isAuth: false,
                token: "",
                role: "",
                loading: false,
                error: true,
                errorMessage: payload
            };
        }
        case LOGOUT: {
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            return {
                ...state,
                isAuth: false,
                token: "",
                role: "",
                loading: false,
                error: false
            };
        }

        default: {
            return state;
        }
    }
};