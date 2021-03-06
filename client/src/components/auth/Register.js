import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    register,
    error,
    clearErrors,
    isAuthenticated,
    isAdmin
  } = authContext;

  useEffect(() => {
    // redirect to the home after registration
    if (isAuthenticated && isAdmin) {
      props.history.push('/admin');
    }

    if (error === 'admin already exists') {
      setAlert(error, 'danger');
      clearErrors();
    } else if (error === 'Admin exists. Only 1 Admin allowed') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, isAdmin, props.history]);

  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 0
  });

  const { name, email, password, password2, role } = admin;

  const onChange = e => setAdmin({ ...admin, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        role,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1 className='s-large'>
        Admin <span className='text-primary'>Registeration</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name' className='sub'>
            Name
          </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email' className='sub'>
            Email Address
          </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='sub'>
            Password
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='4'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2' className='sub'>
            Confirm Password
          </label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='4'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
