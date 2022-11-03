import { USER_LOGIN } from "../../utils/config";
import { GET_ACCOUNT_INFORMATION, GET_ACCOUNT_USER_DETAIL, GET_LIST_USERS, GET_TYPE_OF_USER, LOGIN_ACTION } from "../types/Type";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  accountInformation: {},
  listUsers: [],
  accountUser: {},
  listTypeOfUser: []
};

export const UserManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, userLogin: action.userAccount};
    case GET_ACCOUNT_INFORMATION:
      return { ...state,  accountInformation: action.accountInformation};
    case GET_LIST_USERS:
      return { ...state, listUsers: action.listUsers};
    case GET_ACCOUNT_USER_DETAIL:
      return { ...state, accountUser: action.accountUser};
    case GET_TYPE_OF_USER:
      return { ...state, listTypeOfUser: action.listTypeOfUser}
    default:
      return state;
  }
};
