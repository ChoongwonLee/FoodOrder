import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MenuContext from '../../context/menu/menuContext';

const MenuForm = () => {
  const menuContext = useContext(MenuContext);

  const { addMenu, clearCurrent, current, updateMenu } = menuContext;

  useEffect(() => {
    if (current !== null) {
      setMenu(current);
    } else {
      setMenu({
        title: '',
        ingredients: '',
        description: '',
        foodImage: '',
        price: ''
      });
    }
  }, [menuContext, current]);

  const [menu, setMenu] = useState({
    title: '',
    ingredients: '',
    description: '',
    foodImage: '',
    price: ''
  });

  const { title, ingredients, description, foodImage, price } = menu;

  const onChange = e =>
    setMenu({
      ...menu,
      [e.target.name]: e.target.value
    });

  // LATER
  const handleSelectedFile = e => {
    // console.log(e.target.files[0].name);
    // console.log(process.env.PUBLIC_URL + 'images/' + e.target.files[0].name);
    setMenu({
      ...menu,
      foodImage: process.env.PUBLIC_URL + 'images/' + e.target.files[0].name
    });
  };

  // const handleFileUpload = e => {
  //   axios.post('');
  // }

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addMenu(menu);
    } else {
      updateMenu(menu);
    }
    setMenu({
      title: '',
      ingredients: '',
      description: '',
      foodImage: '',
      price: ''
    });
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Menu' : 'Add Menu'}</h2>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Ingredients'
        name='ingredients'
        value={ingredients}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Price'
        name='price'
        value={price}
        onChange={onChange}
      />
      <h5>{current ? 'Update' : 'Upload'} food image</h5>
      <input
        type='file'
        placeholder='Food Image'
        onChange={handleSelectedFile}
      />
      {/*<button className='btn btn-sm' onClick={handleFileUpload}>
        Upload
      </button>*/}
      <div>
        <input
          type='submit'
          value={current ? 'Update Menu' : 'Add Menu'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default MenuForm;
