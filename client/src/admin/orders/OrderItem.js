import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import OrderContext from '../../context/order/orderContext';

const OrderItem = ({ order }) => {
  const orderContext = useContext(OrderContext);
  const { updateOrder, removeOrder, orders } = orderContext;

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
      <p className='text-primary text-left' className='sub'>
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
            <label htmlFor='Customer' className='sub'>
              Customer:{' '}
            </label>
            <p className='sub'>{customer}</p>
          </li>
        )}
        {address && (
          <li>
            <label htmlFor='Address' className='sub'>
              Address:{' '}
            </label>
            <p className='sub'>{address}</p>
          </li>
        )}
        {menuTitle && (
          <li>
            <label htmlFor='Menu' className='sub'>
              Menu:{' '}
            </label>
            <p className='sub'>{menuTitle}</p>
          </li>
        )}
        {price && (
          <li>
            <label htmlFor='Menu Price' className='sub'>
              Price:{' '}
            </label>
            <p className='sub'>${(price * quantity).toFixed(2)}</p>
          </li>
        )}
        {quantity && (
          <li>
            <label htmlFor='Quantity' className='sub'>
              Quantity:{' '}
            </label>
            <p className='sub'>{quantity}</p>
          </li>
        )}
        {date && (
          <li>
            <label htmlFor='Date' className='sub'>
              Date:{' '}
            </label>
            <p className='sub'>
              {moment(date).format('YYYY MMMM Do HH:mm:ss')}
            </p>
          </li>
        )}
      </ul>
      <form onSubmit={onSubmit}>
        <input type='radio' name='status' value='ordered' onChange={onChange} />{' '}
        Ordered{' '}
        <input
          type='radio'
          name='status'
          value='delivered'
          onChange={onChange}
        />
        Delivered &nbsp;&nbsp;
        <button type='submit' className='btn btn-primary btn-sm btn-mobile'>
          Update
        </button>
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
