import React, { useReducer } from 'react';
import uuid from 'uuid';
import MenuContext from './menuContext';
import MenuReducer from './menuReducer';
import {
  ADD_MENU,
  DELETE_MENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MENU,
  FILTER_MENUS,
  CLEAR_FILTER
} from '../types';

const MenuState = props => {
  const initialState = {
    menus: [
      {
        id: 1,
        title: 'Deluxe Hamburger',
        ingredients: 'beef, onions, cabage, cheese, tomato',
        description: 'Organic healthy and fresh bergur',
        foodImage: process.env.PUBLIC_URL + 'images/burger.jpg',
        price: 10.99
      },
      {
        id: 2,
        title: 'Noodle Soup',
        ingredients: 'beef, garlic, hot pepper, rice noodle',
        description: 'Noodle soup with organic ingredients!',
        foodImage: process.env.PUBLIC_URL + 'images/pho.jpg',
        price: 12.99
      },
      {
        id: 3,
        title: 'Potato Fries',
        ingredients: 'Sliced potato, salts',
        description: 'Fried by good oil',
        foodImage: process.env.PUBLIC_URL + 'images/fries.jpeg',
        price: 6.49
      }
    ]
  };

  const [state, dispatch] = useReducer(MenuReducer, initialState);

  // Add Menu
  const addMenu = menu => {
    menu.id = uuid.v4();
    dispatch({ type: ADD_MENU, payload: menu });
  };

  // Delete Menu

  // Set Current Menu

  // Clear Current Menu

  // Update Menu

  // Filter Menus

  // Clear Filter

  return (
    <MenuContext.Provider
      value={{
        menus: state.menus,
        addMenu
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuState;
