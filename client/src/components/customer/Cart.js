import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from '../../context/order/orderContext';
import CartItem from './CartItem';

const Cart = () => {
  const ordercontext = useContext(OrderContext);

  const { orders, loading, getOrder } = ordercontext;

  useEffect(() => {
    getOrder();
  }, []);

  if (orders.length === 0 && !loading) {
    return <h4>No order item found. Please select your food.</h4>;
  }

  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < orders.length; i++) {
      sum += Number(orders[i].quantity) * Number(orders[i].price);
    }
    let total = sum.toFixed(2);
    return total;
  };

  return (
    <div className='container'>
      <h2 className='text-center text-primary'>Shopping Cart</h2>
      <h3>Your total is ${getTotal()} </h3>
      {orders.length !== 0 &&
        !loading &&
        orders.map(order => {
          return <CartItem key={order._id} order={order} />;
        })}
      <Link to='/orderconfirm'>
        <button className='btn btn-primary'>Check Out</button>
      </Link>
    </div>
  );
};

export default Cart;