import {
  ADD_ORDER,
  ORDER_ERROR,
  GET_CUSTOMER_ORDER,
  UPDATE_CUSTOMER_ORDER,
  REMOVE_CUSTOMER_ORDER,
  SEND_ORDER_EMAIL,
  GET_ALL_ORDERS,
  CLEAR_ORDERS,
  FILTER_ORDERS,
  CLEAR_FILTER
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
    case GET_ALL_ORDERS:
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
    case REMOVE_CUSTOMER_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload),
        loading: false
      };
    case SEND_ORDER_EMAIL:
      return {
        ...state,
        result: action.payload
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
        filtered: null,
        result: null,
        status: 'ordered',
        error: null
      };
    case FILTER_ORDERS:
      return {
        ...state,
        filtered: state.orders.filter(order => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            order.customer.match(regex) ||
            order.address.match(regex) ||
            order.status.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
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
