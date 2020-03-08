import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/orderContext';

const OrderItem = ({ order }) => {
  const orderContext = useContext(OrderContext);
  const { updateOrder, removeOrder } = orderContext;

  const {
    _id,
    customer,
    address,
    menuTitle,
    price,
    quantity,
    status,
    date
  } = order;

  const [orderStatus, setOrderStatus] = useState({
    ...order
  });

  const onChange = e => {
    setOrderStatus({
      ...orderStatus,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateOrder(orderStatus);
  };

  return (
    <div className='card bg-light'>
      <p className='text-primary text-left'>
        <label htmlFor='status'>Status: </label>{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (status === 'ordered' ? 'badge-danger' : 'badge-success')
          }
        >
          {status}
        </span>
      </p>
      <ul className='list'>
        {customer && (
          <li>
            <label htmlFor='Customer'>Customer: </label>
            {customer}
          </li>
        )}
        {address && (
          <li>
            <label htmlFor='Address'>Address: </label>
            {address}
          </li>
        )}
        {menuTitle && (
          <li>
            <label htmlFor='Menu'>Menu: </label>
            {menuTitle}
          </li>
        )}
        {price && (
          <li>
            <label htmlFor='Menu Price'>Menu Price: </label>$ {price}
          </li>
        )}
        {quantity && (
          <li>
            <label htmlFor='Quantity'>Quantity: </label>
            {quantity}
          </li>
        )}
        {date && (
          <li>
            <label htmlFor='Date'>Date: </label>
            {date}
          </li>
        )}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          type='radio'
          name='status'
          value='ordered'
          checked={status === 'ordered'}
          onChange={onChange}
        />{' '}
        Ordered{' '}
        <input
          type='radio'
          name='status'
          value='delivered'
          onChange={onChange}
        />{' '}
        Delivered {'   '}
        <input
          type='submit'
          value='Update'
          className='btn btn-primary btn-sm'
        />
      </form>
      <p>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => {
            removeOrder(_id);
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderItem;
