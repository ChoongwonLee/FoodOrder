import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import {
  ADD_ORDER,
  ORDER_ERROR,
  GET_CUSTOMER_ORDER,
  UPDATE_CUSTOMER_ORDER
} from '../types';

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

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addOrder,
        getOrder,
        updateOrder
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
