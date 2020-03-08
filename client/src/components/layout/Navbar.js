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

  const { isAuthenticated, isAdmin, logout /*user*/ } = authContext;
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
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      {!isAuthenticated && (
        <Fragment>
          <li>
            <Link to='/register'>Register</Link>
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
              <i className='fas fa-shopping-cart' />
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
            <Link to='/admin/customers'>Customers</Link>
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
        <i className={icon} /> {title}
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
