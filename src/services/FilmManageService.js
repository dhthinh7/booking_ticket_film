import { GROUP } from "../utils/config";
import { baseServices } from "./baseService";

class FilmManageService extends baseServices {
  getListBanners = () => this.get('QuanLyPhim/LayDanhSachBanner');
  getListFilms = (filmName='') => {
    // filmName.trim() !== '' ? this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${filmName}`) : this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`)
    if (filmName.trim() !== '') {
      return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${filmName}`)
    }
    return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`)
  }
}

export const filmManageService = new FilmManageService ()