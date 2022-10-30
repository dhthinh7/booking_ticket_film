import { BOOKING_ACTION, BOOKING_TICKET, GET_SEAT_OTHER_USER, GET_TICKET_ROOM } from "../types/Type";

const initialState = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [], // list of seats that current user ongoing
  danhSachGheKhachDat: []
  
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
      return { ...state, danhSachGheKhachDat: action.arrGheKhachDat}

    default:
      return { ...state };
  }
}
