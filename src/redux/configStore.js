import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CinemaReducer } from "./reducers/CinemaReducer";
import { FilmManageReducer } from "./reducers/FilmManageReducer";

const rootReducer = combineReducers({
  FilmManageReducer,
  CinemaReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))