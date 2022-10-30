import { connection } from "../..";
import { bookingTicketServices } from "../../services/BookingTicketServices"
import { STATUS_CODE } from "../../utils/config";
import { BOOKING_ACTION, BOOKING_TICKET, GET_TICKET_ROOM } from "../types/Type";

export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      let { data, status } = await bookingTicketServices.layDanhSachPhongVe(maLichChieu);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_TICKET_ROOM,
          chiTietPhongVe: data.content
        })
      }
    } catch (error) {

    }
  }
}

export const datVeAction = (danhSachVe) => {
  return async (dispatch) => {
    try {
      let { data, status } = await bookingTicketServices.datVe(danhSachVe);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(layDanhSachPhongVeAction(danhSachVe.maLichChieu))
        await dispatch({ type: BOOKING_ACTION })
      }
    } catch (error) {

    }
  }
}

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {

    // Dispatch action to update danhSachGheDangDat to reducer
    await dispatch({
      type: BOOKING_TICKET,
      gheDuocChon: ghe
    })

    // Use getState to get data from reducer
    let danhSachGheDangDat = getState().BookingTicketReducer.danhSachGheDangDat;
    let taiKhoan = getState().UserManageReducer.userLogin.taiKhoan;
     
    // Convert object to JSON to as argument for calling api signalR
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    // Call api signalR to inform to server update status of seat
    connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
  }
}