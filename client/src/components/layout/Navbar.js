import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MenuContext from '../../context/menu/menuContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const menuContext = useContext(MenuContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearMenus } = menuContext;

  const onLogout = () => {
    logout();
    clearMenus();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const customerLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-dark'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : customerLinks}</ul>
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
