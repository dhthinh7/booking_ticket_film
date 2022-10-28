import { baseServices } from "./baseService";

class UserManageService extends baseServices {
  userLogin = (userAccount) => this.post('QuanLyNguoiDung/DangNhap', userAccount);
}

export const userManageService = new UserManageService();