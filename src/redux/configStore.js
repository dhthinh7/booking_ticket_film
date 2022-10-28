import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CinemaReducer } from "./reducers/CinemaReducer";
import { FilmManageReducer } from "./reducers/FilmManageReducer";
import { UserManageReducer } from "./reducers/UserManageReducer";

const rootReducer = combineReducers({
  FilmManageReducer,
  CinemaReducer,
  UserManageReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))