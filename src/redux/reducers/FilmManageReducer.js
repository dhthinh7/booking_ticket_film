import { GET_FILM_INFORMATION, GET_LIST_BANNER, GET_LIST_FILMS } from "../types/Type";

const initialState = {
  listBanner: [],
  listFilms: [],
  filmInformation: {}
};

export const FilmManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BANNER:
      return {...state, listBanner: action.listBanner};
    case GET_LIST_FILMS:
      return {...state, listFilms: action.listFilms};
    case GET_FILM_INFORMATION:
      return {...state, filmInformation: action.filmInformation};
    default:
      return { ...state };
  }
};
