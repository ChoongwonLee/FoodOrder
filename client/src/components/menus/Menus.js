import React, { Fragment, useContext } from 'react';
import MenuItem from './MenuItem';
import MenuContext from '../../context/menu/menuContext';

const Menus = () => {
  const menuContext = useContext(MenuContext);

  const { menus } = menuContext;

  return (
    <Fragment>
      {menus.map(menu => (
        <MenuItem key={menu.id} menu={menu} />
      ))}
    </Fragment>
  );
};

export default Menus;
