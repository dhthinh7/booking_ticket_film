import { cinemaService } from "../../services/CinemaService"
import { STATUS_CODE } from "../../utils/config";
import { GET_FILM_DETAIL, GET_INFOR_CINEMA, GET_LIST_CINEMA_DETAIL } from "../types/Type";

export const getShowTimeOfFilmAction = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await cinemaService.getShowTimeOfFilm();
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
  console.log("film ID", filmId)
  return async (dispatch) => {
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
  }
}