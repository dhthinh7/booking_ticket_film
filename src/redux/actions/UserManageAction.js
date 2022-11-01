import { history } from "../..";
import { userManageService } from "../../services/UserManageService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../utils/config";
import { GET_ACCOUNT_INFORMATION, LOGIN_ACTION } from "../types/Type";

export const userLoginAction = (userAccount) => {
  return async (dispatch) => {
    try {
      let {data, status} = await userManageService.userLogin(userAccount);
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
  }
}

export const accountInformationAction  = () => {
  return async (dispatch) => {
    try {
      let {data, status} = await userManageService.accountInformation();
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountInformation: data.content
      })
    } catch (error) {
      
    }
  }
}