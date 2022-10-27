import { cinemaService } from "../../services/CinemaService"
import { STATUS_CODE } from "../../utils/config";
import { GET_INFOR_CINEMA, GET_LIST_CINEMA_DETAIL } from "../types/Type";

export const getInforCinemaAction = async (dispacth) => {
  try {
    let {data, status} = await cinemaService.getInforCinema();
    if (status === STATUS_CODE.SUCCESS) {
      dispacth({
        type: GET_INFOR_CINEMA,
        listCinema: data.content
      })

    }
  } catch (error) {
    
  }
  
}

export const getShowTimeOfFilmAction = async (dispatch) => {
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