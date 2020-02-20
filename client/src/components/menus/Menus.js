import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MenuItem from './MenuItem';
import MenuContext from '../../context/menu/menuContext';

const Menus = () => {
  const menuContext = useContext(MenuContext);

  const { menus, filtered } = menuContext;

  if (menus.length === 0) {
    return <h4>Please add a menu</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(menu => (
              <CSSTransition key={menu.id} timeout={1000} classNames='item'>
                <MenuItem menu={menu} />
              </CSSTransition>
            ))
          : menus.map(menu => (
              <CSSTransition key={menu.id} timeout={1000} classNames='item'>
                <MenuItem menu={menu} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Menus;
