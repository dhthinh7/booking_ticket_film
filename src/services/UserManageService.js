import { baseServices } from "./baseService";

class UserManageService extends baseServices {
  userLogin = (userAccount) => this.post('QuanLyNguoiDung/DangNhap', userAccount);
  accountInformation = () => this.post('QuanLyNguoiDung/ThongTinTaiKhoan');
  userRegister = (userRegister) => this.post(`QuanLyNguoiDung/DangKy`, userRegister);
}

export const userManageService = new UserManageService();