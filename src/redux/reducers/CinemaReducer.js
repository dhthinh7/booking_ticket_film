import { GET_ALL_CINEMA, GET_FILM_DETAIL, GET_GROUP_OF_CINEMA, GET_LIST_CINEMA_DETAIL } from "../types/Type";

const initialState = {
  listCinema: [],
  listCinemaDetail: [],
  filmDetail: {},
  groupOfCinema: [],
};

export const CinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CINEMA_DETAIL:
      return { ...state, listCinemaDetail: action.listCinemaDetail };
    case GET_FILM_DETAIL:
      return { ...state, filmDetail: action.filmDetail };
    case GET_ALL_CINEMA:
      return { ...state, listCinema: action.listCinema };
    case GET_GROUP_OF_CINEMA:
      return { ...state, groupOfCinema: action.groupOfCinema}
    default:
      return { ...state };
  }
};
