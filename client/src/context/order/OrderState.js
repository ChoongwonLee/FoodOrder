import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import { ADD_ORDER, ORDER_ERROR, SET_CURRENT } from '../types';

const OrderState = props => {
  const initialState = {
    orders: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const addOrder = async order => {
    // console.log(order);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/orders/${order.menuId}`,
        order,
        config
      );

      dispatch({ type: ADD_ORDER, payload: res.data });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.message });
    }
  };

  // Set Current Order
  const setCurrent = order => {
    dispatch({ type: SET_CURRENT, payload: order });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addOrder,
        setCurrent
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
