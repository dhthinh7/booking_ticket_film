import { GET_LIST_BANNER } from "../types/Type";

const initialState = {
  listBanner: []
};

export const FilmManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_BANNER:
      return {...state, listBanner: action.listBanner}
    default:
      return { ...state };
  }
};
