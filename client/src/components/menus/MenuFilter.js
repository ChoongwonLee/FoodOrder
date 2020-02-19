import React, { useContext, useState, useEffect } from 'react';
import MenuContext from '../../context/menu/menuContext';

const MenuFilter = () => {
  const menuContext = useContext(MenuContext);
  // eslint-disable-next-line
  const [text, setText] = useState('');

  const { filterMenus, clearFilter, filtered } = menuContext;

  // eslint-disable-next-line
  useEffect(() => {
    if (filtered === null) {
      setText('');
    }
  });

  const onChange = e => {
    if (e.target.value !== '') {
      filterMenus(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type='text' placeholder='Filter Menus...' onChange={onChange} />
    </form>
  );
};

export default MenuFilter;
