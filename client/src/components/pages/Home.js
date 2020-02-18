import React from 'react';
import Menus from '../menus/Menus';
import MenuForm from '../menus/MenuForm';
import MenuFilter from '../menus/MenuFilter';

const Home = () => {
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
