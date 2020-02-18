import React from 'react';
import Menus from '../menus/Menus';
import MenuForm from '../menus/MenuForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <MenuForm />
      </div>
      <div>
        <Menus />
      </div>
    </div>
  );
};

export default Home;
