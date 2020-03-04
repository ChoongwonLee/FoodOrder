import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/orderContext';

const imageSize = { width: '120px', height: '100px' };

const CartItem = ({ order }) => {
  const orderContext = useContext(OrderContext);

  const { menuTitle, menuImage, quantity, price } = order;

  const { updateOrder, orders } = orderContext;

  const [update, setUpdate] = useState({
    ...order,
    price: 1
  });

  // state for dropdown list
  const [option, setOption] = useState({ quantity });

  const handleChange = e => {
    setOption({ value: e.target.value });
    setUpdate({
      ...order,
      quantity: e.target.value
    });
  };

  useEffect(() => {
    setUpdate(update);
    updateOrder(update);
  }, [update]);

  return (
    <div className='card grid-4'>
      <div className='all-center'>
        <img
          src={`http://localhost:8000/${menuImage}`}
          alt='foodImage'
          style={imageSize}
        />
      </div>
      <div className='all-center' style={{ alignContent: 'center' }}>
        {menuTitle}
      </div>
      <div className='all-center'>
        <select value={option.quantity} onChange={handleChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className='all-center'>{price * quantity}</div>
    </div>
  );
};

CartItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default CartItem;
