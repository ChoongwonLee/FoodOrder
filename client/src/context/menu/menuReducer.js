import {
  GET_MENUS,
  ADD_MENU,
  DELETE_MENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MENU,
  FILTER_MENUS,
  CLEAR_FILTER,
  MENU_ERROR,
  CLEAR_MENUS,
  GET_MENU_BY_ID
} from '../types';
import menuContext from './menuContext';

export default (state, action) => {
  switch (action.type) {
    case GET_MENUS:
    case GET_MENU_BY_ID:
      return {
        ...state,
        menus: action.payload,
        loading: false
      };
    case ADD_MENU:
      return {
        ...state,
        menus: [action.payload, ...state.menus],
        loading: false
      };
    case DELETE_MENU:
      return {
        ...state,
        menus: state.menus.filter(menu => menu._id !== action.payload),
        loading: false
      };
    case CLEAR_MENUS:
      return {
        ...state,
        menus: null,
        current: null,
        filtered: null,
        error: null
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
          menu._id === action.payload._id ? action.payload : menu
        ),
        loading: false
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
