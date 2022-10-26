import { filmManageService } from "../../services/FilmManageService"
import { GET_LIST_BANNER } from "../types/Type";

export const getListBannersAction = () => {
  return async (dispatch) => {
    try {
      const listBanner = await filmManageService.getListBanners();
      dispatch({
        type: GET_LIST_BANNER,
        listBanner: listBanner.data.content
      })
    } catch (error) {
      // 
    }
  }
}