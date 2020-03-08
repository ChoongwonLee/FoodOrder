import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';
import OrderItem from './OrderItem';
import OrderFilter from './OrderFilter';
import Spinner from '../../components/layout/Spinner';

const AdminOrder = props => {
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const { orders, filtered, getAllOrder, loading } = orderContext;

  useEffect(() => {
    getAllOrder();
    // eslint-disable-next-line
  }, [orders]);

  if (!authContext.isAuthenticated) {
    props.history.push('/');
  }

  if (orders !== null && orders.length === 0 && !loading) {
    return <h4>There is no order at this moment.</h4>;
  }

  return (
    <div className='container'>
      <div>
        <h2 className='text-center text-primary'>Order List</h2>
      </div>
      <OrderFilter />
      {orders !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(order => (
                <CSSTransition key={order._id}>
                  <OrderItem order={order} />
                </CSSTransition>
              ))
            : orders.map(order => (
                <CSSTransition key={order._id}>
                  <OrderItem order={order} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AdminOrder;
