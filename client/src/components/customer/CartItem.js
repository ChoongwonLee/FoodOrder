import React, { useState, useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import OrderContext from '../../context/order/orderContext';
import '../../components/customer/css/customerViews.css';

const CartItem = ({ order }) => {
  const orderContext = useContext(OrderContext);

  const { _id, menuTitle, menuImage, quantity, price } = order;

  const { updateOrder, removeOrder } = orderContext;

  const [update, setUpdate] = useState({
    ...order,
    quantity: 1
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

  const handleRemove = () => {
    removeOrder(_id);
  };

  useEffect(() => {
    setUpdate(update);
    updateOrder(update);
    // eslint-disable-next-line
  }, [update]);

  return (
    <Fragment>
      <tr>
        <td className='td'>
          <img
            src={`https://won-food-mall.herokuapp.com/${menuImage}`}
            alt='foodImage'
            className='cart-image'
          />
        </td>
        <td className='td'>{menuTitle}</td>
        <td className='td'>
          <select
            value={option.quantity}
            onChange={handleChange}
            className='select-mobile'
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </td>
        <td className='td'>{price * quantity}</td>
        <td className='td'>
          <button
            className='btn btn-danger btn-sm btn-table-mobile'
            onClick={handleRemove}
          >
            Remove
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

CartItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default CartItem;
