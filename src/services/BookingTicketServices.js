import { baseServices } from "./baseService";

class BookingTicketServices extends baseServices {
  datVe = (danhSachVe) => this.post('QuanLyDatVe/DatVe', danhSachVe);
  layDanhSachPhongVe = (maLichChieu) => this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
  // QuanLyDatVe/TaoLichChieu
  taoLichChieu = (lichChieu) => this.post('QuanLyDatVe/TaoLichChieu', lichChieu);
}

export const bookingTicketServices = new BookingTicketServices();