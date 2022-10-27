import { GROUP } from "../utils/config";
import { baseServices } from "./baseService";

class CinemaService extends baseServices {
  getInforCinema = () => this.get('QuanLyRap/LayThongTinHeThongRap');
  getInforGroupOfCinema = (cinemaId) => this.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaId}`);
  getShowTimeOfFilm = (cinemaId = '') => this.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaId}&maNhom=${GROUP}`);
}

export const cinemaService = new CinemaService()