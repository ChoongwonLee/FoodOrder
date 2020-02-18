import React, { Fragment, useContext } from 'react';
import MenuItem from './MenuItem';
import MenuContext from '../../context/menu/menuContext';

const Menus = () => {
  const menuContext = useContext(MenuContext);

  const { menus, filtered } = menuContext;

  if (!menus.length === 0) {
    return <h4>Please add a menu</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(menu => <MenuItem key={menu.id} menu={menu} />)
        : menus.map(menu => <MenuItem key={menu.id} menu={menu} />)}
    </Fragment>
  );
};

export default Menus;
