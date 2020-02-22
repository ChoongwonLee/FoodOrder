import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MenuItem from './MenuItem';
import MenuContext from '../../context/menu/menuContext';
import Spinner from '../layout/Spinner';

const Menus = () => {
  const menuContext = useContext(MenuContext);

  const { menus, filtered, getMenus, loading } = menuContext;

  useEffect(() => {
    getMenus();
    // eslint-disable-next-line
  }, []);

  if (menus !== null && menus.length === 0 && !loading) {
    return <h4>Please add a menu</h4>;
  }

  return (
    <Fragment>
      {menus !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(menu => (
                <CSSTransition key={menu._id} timeout={1000} classNames='item'>
                  <MenuItem menu={menu} />
                </CSSTransition>
              ))
            : menus.map(menu => (
                <CSSTransition key={menu._id} timeout={1000} classNames='item'>
                  <MenuItem menu={menu} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Menus;
