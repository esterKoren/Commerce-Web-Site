import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer"; 
import carReducer from "./carReducer";

const rootReducer = combineReducers({
    user: userReducer,
    car: carReducer
});

const store = createStore(rootReducer);

export default store;

