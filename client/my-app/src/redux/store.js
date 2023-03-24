import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose
} from "redux";
import thunk from "redux-thunk";
import { allUserProfileReducer } from "./allUser/allUsers.reducer";
import { authReducer } from "./auth/auth.reducer";
import { allSprintReducer } from "./sprint/sprint.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    allUser: allUserProfileReducer,
    allSprints: allSprintReducer
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    createCompose(applyMiddleware(thunk))
);