import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose
} from "redux";
import thunk from "redux-thunk";
import { allUserProfileReducer } from "./allUser/allUsers.reducer";
import { authReducer } from "./auth/auth.reducer";
import { myTaskReducer } from "./myTask/myTask.reducer";
import { allSprintReducer } from "./sprint/sprint.reducer";
import { allSprintTaskReducer } from "./sprintTask/sprintTask.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    allUser: allUserProfileReducer,
    allSprints: allSprintReducer,
    allMyTasks: myTaskReducer,
    allSprintTask: allSprintTaskReducer
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    createCompose(applyMiddleware(thunk))
);