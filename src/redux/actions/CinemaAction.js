import { cinemaService } from "../../services/CinemaService"
import { STATUS_CODE } from "../../utils/config";
import { GET_ALL_CINEMA, GET_FILM_DETAIL, GET_GROUP_OF_CINEMA, GET_LIST_CINEMA_DETAIL, HIDE_LOADING, SHOW_LOADING } from "../types/Type";

export const getShowTimeOfFilmAction = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await cinemaService.getShowTimeOfFilm();
      console.log("datat cinema", data)
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_LIST_CINEMA_DETAIL,
          listCinemaDetail: data.content
        })
      }
    } catch (error) {

    }
  }
}

export const layThongTinLichChieuPhimAction = (filmId) => {
  return async (dispatch) => {
    await dispatch({
      type: SHOW_LOADING
    })

    try {
      let { data, status } = await cinemaService.layThongTinLichChieuPhim(filmId);

      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_FILM_DETAIL,
          filmDetail: data.content
        })
      }
    } catch (error) {

    }
    await dispatch({
      type: HIDE_LOADING
    })
  }
}

export const getInforCinemaAction = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await cinemaService.getInforCinema();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_ALL_CINEMA,
          listCinema: data.content
        })
      }
    } catch (error) {

    }
  }
}

export const getInforGroupOfCinemaAction = (cinemaId) => {
  return async (dispatch) => {
    try {
      let { data, status } = await cinemaService.getInforGroupOfCinema(cinemaId);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_GROUP_OF_CINEMA,
          groupOfCinema: data.content
        })
      }
    } catch (error) {

    }
  }
}