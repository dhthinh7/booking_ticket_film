import { connection, history } from "../..";
import { bookingTicketServices } from "../../services/BookingTicketServices"
import { STATUS_CODE } from "../../utils/config";
import { Notification } from "../../utils/Notification";

import { BOOKING_ACTION, BOOKING_TICKET, CHANGE_TAB_ACTIVE, CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE, GET_TICKET_ROOM, HIDE_LOADING, SHOW_LOADING } from "../types/Type";
import { accountInformationAction } from "./UserManageAction";

export const layDanhSachPhongVeAction = (maLichChieu, isLoading = false) => {
  return async (dispatch) => {

    isLoading && await dispatch({
      type: SHOW_LOADING
    })

    try {
      let { data, status } = await bookingTicketServices.layDanhSachPhongVe(maLichChieu);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch({
          type: GET_TICKET_ROOM,
          chiTietPhongVe: data.content
        })
      }
    } catch (error) {

    }

    isLoading && await dispatch({
      type: HIDE_LOADING
    })
  }
}

export const datVeAction = (danhSachVe) => {
  return async (dispatch, getState) => {
    try {
      let { status } = await bookingTicketServices.datVe(danhSachVe);
      if (status === STATUS_CODE.SUCCESS) {
        await dispatch(layDanhSachPhongVeAction(danhSachVe.maLichChieu, true))
        await dispatch(accountInformationAction());
        await dispatch({ type: BOOKING_ACTION })
        let userLogin = getState().UserManageReducer.userLogin;
        connection.invoke('datGheThanhCong', userLogin.taiKhoan, danhSachVe.maLichChieu);
        await dispatch({
          type: CHANGE_TAB_ACTIVE,
          number: '2'
        })
      }
    } catch (error) {
      alert('Không thể đặt vé')
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
    
    // console.log('danhSachGheDangDat', danhSachGheDangDat);
    // console.log('taiKhoan', taiKhoan);
    // console.log('maLichChieu', maLichChieu);
    // Convert object to JSON to as argument for calling api signalR
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);


    // Call api signalR to inform to server update status of seat
    connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
  }
}

export const taoLichChieuAction = (lichChieu) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADING });
    try {
      let { data, status } = await bookingTicketServices.taoLichChieu(lichChieu);
      Notification('success', data.content)
      history.push('/admin/films');
      dispatch({ type: CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE, selectedKeys: '/admin/films' })
    } catch (error) {
      Notification('error', 'Tạo lịch chiếu không thành công', error.response.data.content);
    }
    setTimeout(() => dispatch({ type: HIDE_LOADING }), 300)
  }
}