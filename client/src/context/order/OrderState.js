import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import {
  ADD_ORDER,
  ORDER_ERROR,
  GET_CUSTOMER_ORDER,
  UPDATE_CUSTOMER_ORDER,
  REMOVE_CUSTOMER_ORDER,
  SEND_ORDER_EMAIL
} from '../types';

const OrderState = props => {
  const initialState = {
    orders: [],
    // current: null,
    // filtered: null,
    result: null,
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

  // Get Customer Order
  const getOrder = async () => {
    try {
      const res = await axios.get('/api/orders');

      dispatch({ type: GET_CUSTOMER_ORDER, payload: res.data });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.message });
    }
  };

  // Update Customer Order
  const updateOrder = async order => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/orders/${order._id}`, order, config);

      dispatch({ type: UPDATE_CUSTOMER_ORDER, payload: res.data });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.message });
    }
  };

  // Remove Customer Order
  const removeOrder = async id => {
    try {
      const res = await axios.delete(`/api/orders/${id}`);

      dispatch({ type: REMOVE_CUSTOMER_ORDER, payload: res.data });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.message });
    }
  };

  // Send Order email
  const sendEmail = async () => {
    try {
      const res = await axios.get('/api/orders/email');

      dispatch({ type: SEND_ORDER_EMAIL, payload: res.data });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.message });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addOrder,
        getOrder,
        updateOrder,
        removeOrder,
        sendEmail
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
