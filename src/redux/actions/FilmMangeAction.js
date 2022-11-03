import { history } from "../..";
import { filmManageService } from "../../services/FilmManageService"
import { STATUS_CODE } from "../../utils/config";
import { Notification } from "../../utils/Notification";
import { GET_FILM_INFORMATION, GET_LIST_BANNER, GET_LIST_FILMS, HIDE_LOADING, SHOW_LOADING } from "../types/Type";

export const getListBannersAction = () => {
  return async (dispatch) => {
    try {
      const listBanner = await filmManageService.getListBanners();
      dispatch({
        type: GET_LIST_BANNER,
        listBanner: listBanner.data.content
      })
    } catch (error) {

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

export const deleteFilms = (filmId, searchText) => {
  return async (dispatch) => {
    await dispatch({ type: SHOW_LOADING });
    try {
      let { status } = await filmManageService.deleteFilms(filmId);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(getListFilmsAction(searchText))
      }
    } catch (error) {

    }

    setTimeout(() => {
      dispatch({ type: HIDE_LOADING });
    }, 200);
  }
}

export const getFilmInformationAction = (filmId) => {
  return async (dispatch) => {
    try {
      let { data } = await filmManageService.getFilmInformation(filmId);
      dispatch({
        type: GET_FILM_INFORMATION,
        filmInformation: data.content
      })
    } catch (error) {

    }
  }
}

export const editUpdatedAction = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADING })
    try {
      await filmManageService.editUpdated(formData);
      history.push('/admin/films');
    } catch (error) {

    }

    setTimeout(() => {
      dispatch({ type: HIDE_LOADING });
    }, 1000)
  }
}

export const addNewFilmAction = (formNewFilm) => {
  return async (dispatch) => {
    dispatch({type: SHOW_LOADING});
    try {
      await filmManageService.addNewFilm(formNewFilm);
      Notification('success', "Thêm phim thành công");
      history.push('/admin/films');
    } catch (error) {
      Notification('error', 'Thêm phim không thành công', error.response.data.content);
    }
    
    setTimeout(() => {
      dispatch({type: HIDE_LOADING})
    }, 500)
  }
}

