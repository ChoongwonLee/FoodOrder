import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MenuContext from '../../context/menu/menuContext';
import OrderContext from '../../context/order/orderContext';

const Navbar = props => {
  const authContext = useContext(AuthContext);
  const menuContext = useContext(MenuContext);
  const orderContext = useContext(OrderContext);

  const { isAuthenticated, isAdmin, logout } = authContext;
  const { clearMenus } = menuContext;
  const { clearOrders } = orderContext;

  const { title, icon } = props;

  const onLogout = () => {
    logout();
    clearMenus();
    clearOrders();
    localStorage.removeItem('token');
  };

  const links = (
    <Fragment>
      <li>
        <Link to='/'>
          <i className='fas fa-home' /> <span className='hide-sm'>Home</span>
        </Link>
      </li>
      <li>
        <Link to='/customer'>
          <i className='fas fa-utensils' />{' '}
          <span className='hide-sm'>Order</span>
        </Link>
      </li>
      {!isAuthenticated && (
        <Fragment>
          <li>
            <Link to='/register'>
              <i className='far fa-id-badge' />{' '}
              <span className='hide-sm'>Register</span>
            </Link>
          </li>
          <li>
            <Link to='/login'>Admin</Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated && !isAdmin && (
        <Fragment>
          <li>
            <Link to='/cart'>
              <i className='fas fa-shopping-cart' />{' '}
              <span className='hide-sm'>Cart</span>
            </Link>
          </li>
          <li>
            <a onClick={onLogout} href='#!'>
              <i className='fas fa-sign-out-alt' />{' '}
              <span className='hide-sm'>Logout</span>
            </a>
          </li>
        </Fragment>
      )}
      {isAuthenticated && isAdmin && (
        <Fragment>
          <li>
            <Link to='/admin/menus'>Menus</Link>
          </li>
          <li>
            <Link to='/admin/orders'>Orders</Link>
          </li>
          <li>
            <a onClick={onLogout} href='#!'>
              <i className='fas fa-sign-out-alt' />{' '}
              <span className='hide-sm'>Logout</span>
            </a>
          </li>
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <div className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{links}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Food Mall',
  icon: 'fas fa-hamburger'
};

export default Navbar;
