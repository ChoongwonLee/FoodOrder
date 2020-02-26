import React, { useState, useContext, useEffect } from 'react';
// import CustomerContext from '../../context/customer/customerContext';

// Todo: Add google map geo code api to validate address
const CustomerForm = props => {
  // const customerContext = useContext(CustomerContext);

  // const { register } = customerContext;

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: ''
  });

  const { firstName, lastName, address, email } = customer;

  const onChange = e => {
    // setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // register({ firstName, lastName, address, email });
    props.history.push('/menuselection');
  };

  return (
    <div className='form-container'>
      <h2>
        <span className='text-primary'>Delivery Information</span>
      </h2>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Delivery Address</label>
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
