import { GET_FILM_DETAIL, GET_INFOR_CINEMA, GET_LIST_CINEMA_DETAIL } from "../types/Type";

const initialState = {
  listCinema: [],
  listCinemaDetail: [],
  filmDetail: {}
};

export const CinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CINEMA_DETAIL:
      return { ...state, listCinemaDetail: action.listCinemaDetail };
    case GET_FILM_DETAIL:
      return { ...state, filmDetail: action.filmDetail };
    default:
      return { ...state };
  }
};
