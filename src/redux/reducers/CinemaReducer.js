import { GET_INFOR_CINEMA, GET_LIST_CINEMA_DETAIL } from "../types/Type";
import moment from 'moment';

const initialState = {
  listCinema: [],
  listCinemaDetail: []
};

export const CinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFOR_CINEMA:
      return {...state, listCinema: action.listCinema}
    case GET_LIST_CINEMA_DETAIL:
      // action.listCinemaDetail.map((item, index) => {
      //   return item.lstCumRap.map((item, index) => {
      //     return item.danhSachPhim.map((item, index) => {
      //       let showTimeFollowDay = []
      //       let showTimeTemp = []
      //       return item.lstLichChieuTheoPhim.map((itemLichChieu, index) => {
      //         let checkExist = 0;
      //         showTimeFollowDay.push({ dateOfShow: itemLichChieu.ngayChieuGioChieu, film: itemLichChieu })
      //         if (showTimeTemp.length === 0) showTimeTemp.push(showTimeFollowDay[0])

      //         console.log("showTimeFollowDay", showTimeFollowDay)
      //         console.log("showTimeTemp", showTimeTemp)

      //       })
      //     })
      //   })
      // })
      return { ...state, listCinemaDetail: action.listCinemaDetail }
    default:
      return state;
  }
};
