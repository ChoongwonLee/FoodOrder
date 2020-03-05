import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MenuContext from '../../context/menu/menuContext';

const Navbar = props => {
  const authContext = useContext(AuthContext);
  const menuContext = useContext(MenuContext);

  const { isAuthenticated, isAdmin, logout /*user*/ } = authContext;
  const { clearMenus } = menuContext;

  const { title, icon } = props;

  const onLogout = () => {
    logout();
    clearMenus();
  };

  // const authLinks = (
  //   <Fragment>
  //     <li>
  //       Hello {user && user.name} {'  '}
  //     </li>
  //     <li>
  //       <Link to='/'>Home</Link>
  //     </li>
  //     <li>
  //       <Link to='/register'>Manage</Link>
  //     </li>
  //     <li>
  //       <a onClick={onLogout} href='#!'>
  //         <i className='fas fa-sign-out-alt' />{' '}
  //         <span className='hide-sm'>Logout</span>
  //       </a>
  //     </li>
  //   </Fragment>
  // );

  // const customerLinks = (
  //   <Fragment>
  //     <li>
  //       <Link to='/'>Home</Link>
  //     </li>
  //     <li>
  //       <Link to='/about'>About</Link>
  //     </li>
  //     <li>
  //       <Link to='/register'>Register</Link>
  //     </li>
  //     <li>
  //       <Link to='/admin'>Admin</Link>
  //     </li>
  //     {isAuthenticated && (
  //       <Fragment>
  //         <li>
  //           <Link to='/admin'>
  //             <i className='fas fa-shopping-cart' />
  //           </Link>
  //         </li>
  //         <li>
  //           <a onClick={onLogout} href='#!'>
  //             <i className='fas fa-sign-out-alt' />{' '}
  //             <span className='hide-sm'>Logout</span>
  //           </a>
  //         </li>
  //       </Fragment>
  //     )}
  //   </Fragment>
  // );

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
            <Link to='/menumanagement'>Menus</Link>
            <Link to='/customermanagement'>Customers</Link>
            <Link to='/ordermanagement'>Orders</Link>
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
      {/*<ul>{isAdmin ? authLinks : customerLinks}</ul>*/}
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
