import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MenuContext from '../../../context/menu/menuContext';
import AuthContext from '../../../context/auth/authContext';
import OrderContext from '../../../context/order/orderContext';

const SelectDetail = props => {
  const menuContext = useContext(MenuContext);
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const menuId = props.match.params.id;

  const { menus, getMenuById } = menuContext;
  const { isAuthenticated } = authContext;
  const { addOrder, orders } = orderContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  const [order, setOrder] = useState({
    menuId: ''
  });

  useEffect(() => {
    getMenuById(menuId);
    setOrder({
      ...order,
      menuId
    });
  }, []);

  const handleOrder = () => {
    addOrder(order);
  };

  return (
    <div className='container'>
      <div className='text-center'>
        <h1>{menus.title}</h1>
      </div>
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={`http://localhost:8000/${menus.foodImage}`}
            className='round-img'
            alt='food image'
            style={{ width: '300px' }}
          />
        </div>
        <div className='card bg-light'>
          <ul className='list'>
            {menus.ingredients && (
              <li>
                <i className='fas fa-carrot'></i>
                <h3>Ingredients</h3>
                <p>{menus.ingredients}</p>
              </li>
            )}
            {menus.description && (
              <li>
                <i className='far fa-comment-alt'></i>
                <h3>Description</h3>
                <p>{menus.description}</p>
              </li>
            )}
          </ul>
          <p>
            <button className='btn btn-primary btn-sm' onClick={handleOrder}>
              Add to order
            </button>
            <button
              className='btn btn-dark btn-sm'
              onClick={() => props.history.goBack()}
            >
              Go back
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SelectDetail);
