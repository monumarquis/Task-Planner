import { USER_PROFILE_ERROR, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "./userProfile.types";
const initState = {
    data: null,
    loading: false,
    error: false
};
export const UserProfileReducer = (
    state = initState,
    { type, payload }
) => {
    switch (type) {
        case USER_PROFILE_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };
        }
        case USER_PROFILE_REQUEST: {

            return {
                ...state,
                data: null,
                loading: true,
                error: false
            };
        }
        case USER_PROFILE_ERROR: {

            return {
                ...state,
                data: null,
                loading: false,
                error: true
            };
        }

        default: {
            return state;
        }
    }
};