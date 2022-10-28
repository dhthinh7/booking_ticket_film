import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../..";
import "./Header.scss";
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from "../../../utils/config";

export default function Header() {
  let { userLogin } = useSelector(state => state.UserManageReducer);
  const Logout = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    history.push('/home');
    window.location.reload()
  }
  return <div>
    <header className="bk-header text-black w-full fixed top-0 z-50 bg-white opacity-90">
      <div className="container mx-auto px-6 flex justify-between h-16 relative">
        <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
          <img src="https://movie-booking-project.vercel.app/img/headTixLogo.png" className="w-12 h-12" alt="headTixLogo.vn" />
        </NavLink>
        <ul className="lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <li className="flex">
            <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black font-medium" activeClassName="text-red-600">Trang chủ</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black font-medium" activeClassName="text-red-600">Liên hệ</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black font-medium" activeClassName="text-red-600">Tin tức</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/apps" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black font-medium" activeClassName="border-b-2 border-white">Ứng dụng</NavLink>
          </li>
        </ul>
        <div className="bk-user flex items-center justify-center">
          {!(_.isEmpty(userLogin)) ? <div className="login flex items-center">
            <div>
              <img src="https://picsum.photos/30/30" className="rounded-full mr-2" alt="" />
            </div>
            <div className="tracking-wider font-medium">Hello <span className="text-green-500">{userLogin.hoTen}</span>!</div>
            <span className="mx-2">|</span>
            <div className="register">
              <div className="hover:text-red-500 hover:duration-300 tracking-wider hover:cursor-pointer font-medium" onClick={Logout}>Đăng xuất</div>
            </div>
          </div> : <div className="login flex items-center">
            <div className="tracking-wider hover:cursor-pointer font-medium hover:text-red-500 hover:duration-300" onClick={() => {
              history.push('/login')
            }}>Đăng nhập</div>
            <span className="mx-2">|</span>
            <div className="register">
              <div className="hover:text-red-500 hover:duration-300 tracking-wider hover:cursor-pointer font-medium" onClick={() => history.push("/register")}>Đăng ký</div>
            </div>
          </div>
          }


        </div>
      </div>
    </header>
  </div>;
}
