import { USER_LOGIN } from "../../utils/config";
import { GET_ACCOUNT_INFORMATION, LOGIN_ACTION } from "../types/Type";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  accountInformation: {}
};

export const UserManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, userLogin: action.userAccount};
    case GET_ACCOUNT_INFORMATION:
      return { ...state,  accountInformation: action.accountInformation}
    default:
      return state;
  }
};
