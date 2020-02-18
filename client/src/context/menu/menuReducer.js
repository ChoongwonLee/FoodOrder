import {
  ADD_MENU,
  DELETE_MENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MENU,
  FILTER_MENUS,
  CLEAR_FILTER
} from '../types';
import menuContext from './menuContext';

export default (state, action) => {
  switch (action.type) {
    case ADD_MENU:
      return {
        ...state,
        menus: [...state.menus, action.payload]
      };
    case DELETE_MENU:
      return {
        ...state,
        menus: state.menus.filter(menu => menu.id !== action.payload)
      };
    default:
      return state;
  }
};
