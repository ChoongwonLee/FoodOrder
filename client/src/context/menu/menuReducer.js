import {
  ADD_MENU,
  DELETE_MENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MENU,
  FILTER_MENUS,
  CLEAR_FILTER,
  MENU_ERROR
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
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_MENU:
      return {
        ...state,
        menus: state.menus.map(menu =>
          menu.id === action.payload.id ? action.payload : menu
        )
      };
    case FILTER_MENUS:
      return {
        ...state,
        filtered: state.menus.filter(menu => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return menu.title.match(regex) || menu.ingredients.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case MENU_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
