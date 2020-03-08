import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const AdminHome = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadAdmin();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <div>
        <h1 className='text-center text-primary'>Admin Tools</h1>
      </div>
      <br />
      <div className='grid-2'>
        <div className='card bg-light'>
          <h2 className='text-center'>Menus: </h2>
          <p className='text-center'>Manage menus</p>
          <br />
          <Link to='/admin/menus'>
            <button className='btn btn-dark btn-block'>Go</button>
          </Link>
        </div>
        <div className='card bg-light'>
          <h2 className='text-center'>Orders: </h2>
          <p className='text-center'>Manage Orders</p>
          <br />
          <Link to='/admin/orders'>
            <button className='btn btn-dark btn-block'>Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
