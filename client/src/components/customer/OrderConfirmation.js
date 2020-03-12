import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import '../customer/css/customerViews.css';

const OrderConfirmation = props => {
  const authContext = useContext(AuthContext);

  const { user, isAuthenticated } = authContext;

  if (!isAuthenticated) {
    props.history.push('/');
  }

  return (
    <div className='container'>
      <p className='text-center s-large'>
        Thank you for your order,{' '}
        <span className='text-primary'>
          <strong>{user.name}</strong>
        </span>
        !{' '}
      </p>
      <p className='text-center lead'>We've received your order.</p>
      {user.email && (
        <p className='text-center lead'>
          The order confirmation will be shortly sent to{' '}
          <span className='text-primary'>
            <strong>{user.email}</strong>
          </span>
        </p>
      )}
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to='/'>
          <button className='btn btn-primary'>To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
