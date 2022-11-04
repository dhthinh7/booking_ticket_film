import { history } from "../..";
import { userManageService } from "../../services/UserManageService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../utils/config";
import { Notification } from "../../utils/Notification";
import { GET_ACCOUNT_INFORMATION, GET_LIST_USERS, GET_TYPE_OF_USER, HIDE_LOADING, LOGIN_ACTION, SHOW_LOADING } from "../types/Type";

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
        history.push('/')
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
        await dispatch({
          type: GET_LIST_USERS,
          listUsers: data.content
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteUserAction = (userAccount, searchText) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADING });
    try {
      await userManageService.deleteUser(userAccount);
      Notification('success', `Xóa ${userAccount} thành công`);
      await dispatch(getListUserAction(searchText));
    } catch (error) {
      Notification('error', `Xóa ${userAccount} không thành công`, error.response.data.content);
    }

    setTimeout(() => {
      dispatch({ type: HIDE_LOADING });
    }, 200);
  }
}

export const getListTyeOfUserAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await userManageService.getListTyeOfUser();
      dispatch({
        type: GET_TYPE_OF_USER,
        listTypeOfUser: data.content
      })
    } catch (error) {

    }
  }
}

export const editUserAction = (userUpdated) => {

  return async (dispatch) => {
    dispatch({type: SHOW_LOADING});
    try {
      await userManageService.editUser(userUpdated)
      Notification('success', 'Cập nhật thông tin người dùng thành công');
    } catch (error) {
      Notification('error', 'Cập nhật thông tin người dùng không thành công', error.response.data.content)
    }
    setTimeout(() => {
      dispatch({type: HIDE_LOADING});
      history.push('/admin/users');
    }, 300);
  }
}

export const addNewUserAction = (userNew) => {
  return async () => {
    try {
      let {data, status} = await userManageService.addNewUser(userNew);
      Notification('success', 'Thêm người dùng mới thành công');
    } catch (error) {
      console.log(error)
      Notification('error', 'Thêm người dùng mới không thành công', error.response.data.content)
    }
  }
}
