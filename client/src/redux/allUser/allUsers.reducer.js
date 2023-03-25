import { ALL_USER_PROFILE_ERROR, ALL_USER_PROFILE_REQUEST, ALL_USER_PROFILE_SUCCESS } from "./allUsers.types";

const initState = {
    data: [],
    loading: false,
    error: false
};
export const allUserProfileReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case ALL_USER_PROFILE_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };
        }
        case ALL_USER_PROFILE_REQUEST: {

            return {
                ...state,
                data: [],
                loading: true,
                error: false
            };
        }
        case ALL_USER_PROFILE_ERROR: {

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