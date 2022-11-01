import { baseServices } from "./baseService";

class UserManageService extends baseServices {
  userLogin = (userAccount) => this.post('QuanLyNguoiDung/DangNhap', userAccount);
  accountInformation = () => this.post('QuanLyNguoiDung/ThongTinTaiKhoan');
}

export const userManageService = new UserManageService();