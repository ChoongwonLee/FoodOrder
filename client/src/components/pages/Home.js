import React, { useContext, useEffect } from 'react';
import Menus from '../menus/Menus';
import MenuForm from '../menus/MenuForm';
import MenuFilter from '../menus/MenuFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
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

export default Home;
