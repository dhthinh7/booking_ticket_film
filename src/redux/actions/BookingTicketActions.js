import { bookingTicketServices } from "../../services/BookingTicketServices"
import { STATUS_CODE } from "../../utils/config";
import { BOOKING_ACTION, GET_TICKET_ROOM } from "../types/Type";

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