import { GET_LIST_BANNER, GET_LIST_FILMS } from "../types/Type";

const initialState = {
  listBanner: [],
  listFilms: [],
};

export const FilmManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BANNER:
      return {...state, listBanner: action.listBanner};
    case GET_LIST_FILMS:
      return {...state, listFilms: action.listFilms}
    default:
      return { ...state };
  }
};
