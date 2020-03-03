import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import MenuContext from '../../context/menu/menuContext';
// import OrderContext from '../../context/order/orderContext';
import ProductItem from './ProductItem';
import MenuFilter from '../menus/MenuFilter';
import Spinner from '../layout/Spinner';

const MenuSelection = props => {
  const menuContext = useContext(MenuContext);
  const authContext = useContext(AuthContext);
  // const orderContext = useContext(OrderContext);

  const { menus, filtered, getMenus, loading } = menuContext;

  // const { setCurrent, addOrder, current, orders } = orderContext;

  useEffect(() => {
    getMenus();
    // eslint-disable-next-line
  }, []);

  // const [order, setOrder] = useState({
  //   menuId: ''
  // });

  if (!authContext.isAuthenticated) {
    props.history.push('/');
  }

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
        <div>
          {filtered !== null
            ? filtered.map(menu => <ProductItem key={menu._id} menu={menu} />)
            : menus.map(menu => <ProductItem key={menu._id} menu={menu} />)}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MenuSelection;
