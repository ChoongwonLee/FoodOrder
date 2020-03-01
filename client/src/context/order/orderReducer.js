import { ADD_ORDER, ORDER_ERROR, SET_CURRENT } from '../types';
import OrderContext from './orderContext';

export default (state, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
};
