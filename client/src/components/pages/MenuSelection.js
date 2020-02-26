import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MenuContext from '../../context/menu/menuContext';
import ProductItem from '../products/ProductItem';
import MenuFilter from '../menus/MenuFilter';
import Spinner from '../layout/Spinner';

// @ Todos:  1.     make a page to collect customer info then redirect to this page
//           2.     make & bring customer & order context here to add order
//           2.1.   define types -> define context, state, and reducer

const CustomerHome = () => {
  const menuContext = useContext(MenuContext);

  const { menus, filtered, getMenus, loading } = menuContext;

  useEffect(() => {
    getMenus();
    // eslint-disable-next-line
  }, []);

  if (menus !== null && menus.length === 0 && !loading) {
    return <h4>There is no menu available now. Please visit again later.</h4>;
  }

  return (
    <div className='container'>
      <div>
        <h2 className='text-center text-primary'>Select your food!</h2>
      </div>
      <MenuFilter />
      {menus !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(menu => (
                <CSSTransition key={menu._id} timeout={1000} classNames='item'>
                  <ProductItem menu={menu} />
                </CSSTransition>
              ))
            : menus.map(menu => (
                <CSSTransition key={menu._id} timeout={1000} classNames='item'>
                  <ProductItem menu={menu} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CustomerHome;
