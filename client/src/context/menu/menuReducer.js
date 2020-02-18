import {
  ADD_MENU,
  DELETE_MENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MENU,
  FILTER_MENUS,
  CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_MENU:
      return {
        ...state,
        menus: [...state.menus, action.payload]
      };
    default:
      return state;
  }
};
