import {
  ADD_ORDER,
  ORDER_ERROR,
  GET_CUSTOMER_ORDER,
  UPDATE_CUSTOMER_ORDER
} from '../types';
// eslint-disable-next-line
import OrderContext from './orderContext';

export default (state, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false
      };
    case GET_CUSTOMER_ORDER:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case UPDATE_CUSTOMER_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
