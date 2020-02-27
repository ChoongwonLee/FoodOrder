import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

// Todo: Add google map geo code api to validate address
const CustomerForm = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerCustomer, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/selection');
    }

    // if customer exists, login customer and redirect to menu selection
    if (error === 'Customer already exists') {
      setAlert(error, 'danger');
      setTimeout(() => {
        props.history.push('/selection');
      }, 2000);
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
    // props.history.push('/menuselection');
  };

  return (
    <div className='form-container'>
      <h2>
        <span className='text-primary'>Delivery Information</span>
      </h2>

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
            required
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
