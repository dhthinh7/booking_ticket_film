import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { BookingTicketReducer } from "./reducers/BookingTicketReducers";
import { CinemaReducer } from "./reducers/CinemaReducer";
import { FilmManageReducer } from "./reducers/FilmManageReducer";
import { UserManageReducer } from "./reducers/UserManageReducer";

const rootReducer = combineReducers({
  FilmManageReducer,
  CinemaReducer,
  UserManageReducer,
  BookingTicketReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))