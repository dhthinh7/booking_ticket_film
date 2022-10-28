import { USER_LOGIN } from "../../utils/config";
import { LOGIN_ACTION } from "../types/Type";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user
};

export const UserManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, userLogin: action.userAccount};

    default:
      return state;
  }
};
