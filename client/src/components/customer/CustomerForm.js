import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const CustomerForm = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { registerCustomer, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/selection');
    }

    // if customer has same email address as admin,
    // prevent deleting admin
    if (error === 'Same email as admin. Try different email.') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    email: '',
    role: 1
  });

  const { name, address, role, email } = customer;

  const onChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    registerCustomer({ name, address, role, email });
  };

  return (
    <div className='form-container'>
      <h1 className='text-primary text-center s-large'>Delivery Information</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email (Optional)</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='For Order Confirmation'
          />
        </div>
        <input
          type='submit'
          value='Submit'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default CustomerForm;
