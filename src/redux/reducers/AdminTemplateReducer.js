import { CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE } from "../types/Type";

const initialState = {
  selectedKeys: '/admin/users'
};

export const AdminTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE:
      return { ...state, selectedKeys: action.selectedKeys}
    default:
      return state;
  }
};
