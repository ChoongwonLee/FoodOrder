import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const OrderConfirmation = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  return (
    <div className='container'>
      <h2>
        Thank you for using food mall, <strong>{user.name}!</strong>{' '}
      </h2>
      <h3>We've received your order.</h3>
      {user.email && (
        <h3>
          The order confirmation will be shortly sent to{' '}
          <strong>{user.email}</strong>
        </h3>
      )}
      <br />
      <div
        className='all-center'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Link to='/'>
          <button className='btn btn-primary'>To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
