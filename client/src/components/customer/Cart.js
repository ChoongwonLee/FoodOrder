import React, { useContext, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';
import AuthContext from '../../context/auth/authContext';
import CartItem from './CartItem';
import '../../components/customer/css/customerViews.css';

const Cart = props => {
  const ordercontext = useContext(OrderContext);
  const authContext = useContext(AuthContext);

  const { orders, loading, getOrder, sendEmail } = ordercontext;

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, [orders]);

  if (!authContext.isAuthenticated) {
    props.history.push('/');
  }

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

  const handleCheckout = async () => {
    sendEmail();
    props.history.push('/orderconfirm');
  };

  return (
    <div className='container'>
      <h2 className='text-center text-primary'>Shopping Cart</h2>
      <br />
      <h3>Your total is ${getTotal()} </h3>
      <table className='table'>
        <thead>
          <tr>
            <th className='th'>Image</th>
            <th className='th'>Item</th>
            <th className='th'>Qty</th>
            <th className='th'>Price</th>
            <th className='th'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {orders.length !== 0 &&
            !loading &&
            orders.map(order => {
              return <CartItem key={order._id} order={order} />;
            })}
        </tbody>
      </table>
      <br />
      <button
        className='btn btn-primary btn-checkout-mobile'
        onClick={handleCheckout}
      >
        Check Out
      </button>
    </div>
  );
};

export default Cart;
