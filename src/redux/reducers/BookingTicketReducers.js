import { BOOKING_ACTION, BOOKING_TICKET, GET_TICKET_ROOM } from "../types/Type";

const initialState = {
  chiTietPhongVe: {},
  danhSachGheDangDat: []
}

export const BookingTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_ROOM:
      return { ...state, chiTietPhongVe: action.chiTietPhongVe };
    case BOOKING_TICKET:
      let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
      let index = danhSachGheDangDatUpdate.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
      index !== -1 ? danhSachGheDangDatUpdate.splice(index, 1) : danhSachGheDangDatUpdate.push(action.gheDuocChon);
      console.log("danhSachGheDangDatUpdate", danhSachGheDangDatUpdate)
      return { ...state, danhSachGheDangDat: danhSachGheDangDatUpdate }
    case BOOKING_ACTION:
      return {...state, danhSachGheDangDat: []}
    default:
      return { ...state };
  }
}
