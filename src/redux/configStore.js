import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { FilmManageReducer } from "./reducers/FilmManageReducer";

const rootReducer = combineReducers({
  FilmManageReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))