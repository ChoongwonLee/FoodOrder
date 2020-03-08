import React, { useContext, useState, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';

const OrderFilter = () => {
  const orderContext = useContext(OrderContext);
  // eslint-disable-next-line
  const [text, setText] = useState('');

  const { filterOrders, clearFilter, filtered } = orderContext;

  // eslint-disable-next-line
  useEffect(() => {
    if (filtered === null) {
      setText('');
    }
  });

  const onChange = e => {
    if (e.target.value !== '') {
      filterOrders(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type='text' placeholder='Filter Orders...' onChange={onChange} />
    </form>
  );
};

export default OrderFilter;
