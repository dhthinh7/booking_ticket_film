import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return <div>
    <header className="bk-header text-black w-full fixed top-0 z-50 bg-white opacity-90">
      <div className="container mx-auto px-6 flex justify-between h-16">
        <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
          <img src="https://movie-booking-project.vercel.app/img/headTixLogo.png" className="w-12 h-12" alt="headTixLogo.vn" />
        </NavLink>
        <ul className="lg:flex">
          <li className="flex">
            <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="text-red-600">Trang chủ</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="text-red-600">Liên hệ</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="text-red-600">Tin tức</NavLink>
          </li>
          <li className="flex">
            <NavLink to="/apps" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">Ứng dụng</NavLink>
          </li>
        </ul>


        {/* {renderLogin()} */}
        <div className="bk-user flex items-center justify-center">
          <div className="login hover:text-red-500 hover:duration-300 flex items-center">
            <div>
              <img src="https://picsum.photos/30/30" className="rounded-full mr-2" alt="" />
            </div>
            <div className="tracking-wider">Đăng nhập</div>
          </div>
          <span className="mx-2">|</span>
          <div className="register">
            <div className="hover:text-red-500 hover:duration-300 tracking-wider">Đăng ký</div>
          </div>
        </div>

        {/* <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>

                        <Option value="vi">Vi</Option>
                    </Select> */}
        {/* <button className="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}
        {/* {t('hello.2')} */}

      </div>
    </header>

  </div>;
}
