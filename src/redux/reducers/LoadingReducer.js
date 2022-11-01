import { HIDE_LOADING, SHOW_LOADING } from "../types/Type";

const initialState = {
  isVisible: false
};

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, isVisible: true };
    case HIDE_LOADING:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};
