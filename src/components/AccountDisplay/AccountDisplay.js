import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { history } from "../..";
import { TOKEN, USER_LOGIN } from "../../utils/config";
import _ from 'lodash';
import './AccountDisplay.scss';
import { FaBars } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

export default function AccountDisplay() {

  let { userLogin } = useSelector(state => state.UserManageReducer);
  let [active, setActive] = useState('');
  let [checkIsAdmin, setcheckIsAdmin] = useState(history.location.pathname);

  const handleIsActive = () => {
    active === '' ? setActive('active') : setActive('');
  }

  return <div className="account-display">
    {!_.isEmpty(userLogin) ?
      <div className="account-content">
        <div className={`account-items ${active}`}>
          <div className="account-user">
            <div style={{ width: 40, height: 40 }} className="text-2xl mr-1 rounded-full bg-red-200 leading-8">
              {userLogin.taiKhoan?.substr(0, 1)}
            </div>
            <div className="font-medium text-green-500">Hello ! {userLogin.taiKhoan}</div>
          </div>
          <span className="mx-2">|</span>
          {checkIsAdmin.includes('admin') ?
            <div className="account-item account-client-side"><NavLink to="/">Client-side</NavLink></div> :
            <div className="account-item account-home"><NavLink to="/">Home</NavLink></div>
          }
          <button onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
          }} className="account-item account-logout text-blue-800 font-medium focus:outline-none">Đăng xuất</button>
        </div>
        <div className="account-icons" onClick={handleIsActive}>
          <FaBars />
        </div>
      </div> : ''}
  </div>
}
