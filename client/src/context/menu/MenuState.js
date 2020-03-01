import React, { useReducer } from 'react';
import axios from 'axios';
import MenuContext from './menuContext';
import MenuReducer from './menuReducer';
import {
  GET_MENUS,
  GET_MENU_BY_ID,
  ADD_MENU,
  DELETE_MENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MENU,
  FILTER_MENUS,
  CLEAR_MENUS,
  CLEAR_FILTER,
  MENU_ERROR
} from '../types';

const MenuState = props => {
  const initialState = {
    menus: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(MenuReducer, initialState);

  // Get Menus
  const getMenus = async () => {
    try {
      const res = await axios.get('/api/menus');

      dispatch({ type: GET_MENUS, payload: res.data });
    } catch (err) {
      dispatch({ type: MENU_ERROR, payload: err.response.message });
    }
  };

  // Get Menu By ID
  const getMenuById = async id => {
    try {
      const res = await axios.get(`/api/menus/${id}`);

      dispatch({ type: GET_MENU_BY_ID, payload: res.data });
    } catch (err) {
      dispatch({ type: MENU_ERROR, payload: err.message });
    }
  };

  // Add Menu
  const addMenu = async menu => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/menus', menu, config);

      dispatch({ type: ADD_MENU, payload: res.data });
      // dispatch({ type: ADD_MENU, payload: menu });
    } catch (err) {
      dispatch({ type: MENU_ERROR, payload: err.response.msg });
    }
  };

  // Delete Menu
  const deleteMenu = async id => {
    try {
      const res = await axios.delete(`/api/menus/${id}`);

      dispatch({ type: DELETE_MENU, payload: id });
    } catch (err) {
      dispatch({ type: MENU_ERROR, payload: err.response.msg });
    }
  };

  // Update Menu
  const updateMenu = async menu => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/menus/${menu._id}`, menu, config);

      dispatch({ type: UPDATE_MENU, payload: res.data });
    } catch (err) {
      dispatch({ type: MENU_ERROR, payload: err.response.msg });
    }
  };

  // Clear Menu
  const clearMenus = () => {
    dispatch({ type: CLEAR_MENUS });
  };

  // Set Current Menu
  const setCurrent = menu => {
    dispatch({ type: SET_CURRENT, payload: menu });
  };

  // Clear Current Menu
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Menus
  const filterMenus = text => {
    dispatch({ type: FILTER_MENUS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <MenuContext.Provider
      value={{
        menus: state.menus,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getMenus,
        addMenu,
        deleteMenu,
        setCurrent,
        clearCurrent,
        updateMenu,
        filterMenus,
        clearFilter,
        clearMenus,
        getMenuById
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuState;
