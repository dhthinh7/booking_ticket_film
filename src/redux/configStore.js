import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { AdminTemplateReducer } from "./reducers/AdminTemplateReducer";
import { BookingTicketReducer } from "./reducers/BookingTicketReducers";
import { CinemaReducer } from "./reducers/CinemaReducer";
import { FilmManageReducer } from "./reducers/FilmManageReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { UserManageReducer } from "./reducers/UserManageReducer";

const rootReducer = combineReducers({
  FilmManageReducer,
  CinemaReducer,
  UserManageReducer,
  BookingTicketReducer,
  LoadingReducer,
  AdminTemplateReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))