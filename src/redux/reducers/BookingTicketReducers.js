import { BOOKING_ACTION, BOOKING_TICKET, CHANGE_TAB_ACTIVE, GET_SEAT_OTHER_USER, GET_TICKET_ROOM } from "../types/Type";

const initialState = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [], // list of seats that current user ongoing
  danhSachGheKhachDat: [],
  tabActive: '1'
}

export const BookingTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_ROOM:
      return { ...state, chiTietPhongVe: action.chiTietPhongVe };

    // Update list seat that ongoing booking
    case BOOKING_TICKET:
      let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
      // Toggle button
      let index = danhSachGheDangDatUpdate.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
      index !== -1 ? danhSachGheDangDatUpdate.splice(index, 1) : danhSachGheDangDatUpdate.push(action.gheDuocChon);
      return { ...state, danhSachGheDangDat: danhSachGheDangDatUpdate }
    case BOOKING_ACTION:
      return {...state, danhSachGheDangDat: []};
    case GET_SEAT_OTHER_USER:
      return { ...state, danhSachGheKhachDat: action.arrGheKhachDat};
    case CHANGE_TAB_ACTIVE:
      return { ...state, tabActive: action.number}
    default:
      return { ...state };
  }
}
