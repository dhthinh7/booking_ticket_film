import { filmManageService } from "../../services/FilmManageService"
import { GET_LIST_BANNER, GET_LIST_FILMS } from "../types/Type";

export const getListBannersAction = () => {
  return async (dispatch) => {
    try {
      const listBanner = await filmManageService.getListBanners();
      dispatch({
        type: GET_LIST_BANNER,
        listBanner: listBanner.data.content
      })
    } catch (error) {
      console.log("error", error)
    }
  }
}

export const getListFilmsAction = (filmName = '') => {
  return async (dispatch) => {
    try {
      const listFilms = await filmManageService.getListFilms(filmName);
      dispatch({
        type: GET_LIST_FILMS,
        listFilms: listFilms.data.content
      })
    } catch (error) {
      
    }
  }
}