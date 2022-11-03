import { history } from "../..";
import { userManageService } from "../../services/UserManageService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../utils/config";
import { Notification } from "../../utils/Notification";
import { GET_ACCOUNT_INFORMATION, GET_LIST_USERS, HIDE_LOADING, LOGIN_ACTION, SHOW_LOADING } from "../types/Type";

export const userLoginAction = (userAccount) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADING })
    try {
      let { data, status } = await userManageService.userLogin(userAccount);
      if (status === STATUS_CODE.SUCCESS) {
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
        localStorage.setItem(TOKEN, data.content.accessToken)
        dispatch({
          type: LOGIN_ACTION,
          userAccount: data.content
        })
        history.goBack()
      }
    } catch (error) {

    }
    setTimeout(() => {
      dispatch({ type: HIDE_LOADING });
    }, 300);
  }
}

export const accountInformationAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await userManageService.accountInformation();
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountInformation: data.content
      })
    } catch (error) {

    }
  }
}

export const userRegisterAction = (userRegister) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADING });
    try {
      await userManageService.userRegister(userRegister);
      Notification('success', 'Đăng ký thành công');
      history.push('/login')
    } catch (error) {
      Notification('error', 'Đăng ký không thành công', error.response.data.content);
    }
    setTimeout(() => { dispatch({ type: HIDE_LOADING }) }, 300)
  }
}

export const getListUserAction = (keyWord = '') => {
  return async (dispatch) => {
    try {
      let { data, status } = await userManageService.getListUser(keyWord);
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_LIST_USERS,
          listUsers: data.content
        })
      }
    } catch (error) {
      
    }
  }
}