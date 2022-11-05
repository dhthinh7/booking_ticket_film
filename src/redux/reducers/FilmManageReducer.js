import { GET_FILM_INFORMATION, GET_LIST_BANNER, GET_LIST_FILMS, GET_LIST_PHIM_DC, GET_LIST_PHIM_SC } from "../types/Type";

const initialState = {
  listBanner: [],
  listFilmAll: [],
  listFilms: [],
  filmInformation: {}
};

export const FilmManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BANNER:
      return { ...state, listBanner: action.listBanner };

    case GET_LIST_FILMS:
      // Filter lít phim đang chiếu - đầu tiên sẽ load phim đang chiếu
      let listFilms = action.listFilms.filter(item => item.dangChieu === true);
      return { ...state, listFilmAll: action.listFilms, listFilms: listFilms };

    case GET_LIST_PHIM_DC:
      let listFilmDC = state.listFilmAll.filter((item) => item.dangChieu === true)
      return { ...state, listFilms: listFilmDC }

    case GET_LIST_PHIM_SC:
      let listFilmSC = state.listFilmAll.filter((item) => item.dangChieu === false)
      return { ...state, listFilms: listFilmSC }

    case GET_FILM_INFORMATION:
      return { ...state, filmInformation: action.filmInformation };
    default:
      return { ...state };
  }
};
