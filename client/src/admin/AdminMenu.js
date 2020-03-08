import React, { useContext, useEffect } from 'react';
import Menus from '../components/menus/Menus';
import MenuForm from '../components/menus/MenuForm';
import MenuFilter from '../components/menus/MenuFilter';
import AuthContext from '../context/auth/authContext';

const AdminMenu = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadAdmin();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <MenuForm />
      </div>
      <div>
        <MenuFilter />
        <Menus />
      </div>
    </div>
  );
};

export default AdminMenu;
