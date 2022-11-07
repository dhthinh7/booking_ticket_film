import React from "react";
import { useSelector } from "react-redux";
import { history } from "../..";
import { TOKEN, USER_LOGIN } from "../../utils/config";
import _ from 'lodash';

export default function AccountDisplay() {
  let { userLogin } = useSelector(state => state.UserManageReducer);
  return <div>
    {!_.isEmpty(userLogin) ?
      <div className="flex justify-center items-center">
        <button className="flex justify-center items-center focus:outline-none" onClick={() => {
          history.push('/')
        }}>
          <div style={{ width: 40, height: 40 }} className="text-2xl mr-1 rounded-full bg-red-200 leading-8">
            {userLogin.taiKhoan?.substr(0, 1)}
          </div>
          <div className="font-medium text-green-500">Hello ! {userLogin.taiKhoan}</div>
        </button>
        <span className="mx-2">|</span>
        <button onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          history.push('/home');
          window.location.reload();
        }} className="text-blue-800 font-medium focus:outline-none">Đăng xuất</button>
      </div> : ''}
  </div>
}
