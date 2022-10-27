import { GET_INFOR_CINEMA, GET_LIST_CINEMA_DETAIL } from "../types/Type";

const initialState = {
  listCinema: [],
  listCinemaDetail: []
};

export const CinemaReducer =  (state = initialState, action) => {
  switch (action.type) {
    case GET_INFOR_CINEMA:
      return {...state, listCinema: action.listCinema}
    case GET_LIST_CINEMA_DETAIL:
      return {...state, listCinemaDetail: action.listCinemaDetail}
    default:
      return state;
  }
};
