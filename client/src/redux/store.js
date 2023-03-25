import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose
} from "redux";
import thunk from "redux-thunk";
import { allTaskReducer } from "./allTask/allTask.reducer";
import { allUserProfileReducer } from "./allUser/allUsers.reducer";
import { authReducer } from "./auth/auth.reducer";
import { myTaskReducer } from "./myTask/myTask.reducer";
import { allSprintReducer } from "./sprint/sprint.reducer";
import { allSprintTaskReducer } from "./sprintTask/sprintTask.reducer";
import { UserProfileReducer } from "./userProfile/userProfile.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    allUser: allUserProfileReducer,
    allSprints: allSprintReducer,
    allMyTasks: myTaskReducer,
    allSprintTask: allSprintTaskReducer,
    allTask: allTaskReducer,
    userProfile: UserProfileReducer
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    createCompose(applyMiddleware(thunk))
);