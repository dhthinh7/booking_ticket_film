import { GROUP } from "../utils/config";
import { baseServices } from "./baseService";

class FilmManageService extends baseServices {
  getListBanners = () => this.get('QuanLyPhim/LayDanhSachBanner');
  getListFilms = (filmName='') => {
    return filmName.trim() !== '' ? this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${filmName}`) : this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`);
  }
  deleteFilms = (filmId) => this.delete(`QuanLyPhim/XoaPhim?MaPhim=${filmId}`);
  getFilmInformation = (filmId) => this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`);
  editUpdated = (formData) => this.post(`QuanLyPhim/CapNhatPhimUpload`, formData);
  addNewFilm = (formNewFilm) => this.post(`QuanLyPhim/ThemPhimUploadHinh`, formNewFilm);
}

export const filmManageService = new FilmManageService ()