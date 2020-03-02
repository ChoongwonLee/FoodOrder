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

  // // set image as local state
  // const [image, setImage] = useState(null);

  const { title, ingredients, description, price } = menu;

  const onChange = e =>
    setMenu({
      ...menu,
      [e.target.name]: e.target.value
    });

  // LATER
  const handleSelectedFile = async e => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('foodImage', e.target.files[0]);
    try {
      const res = await axios.post('/api/menus/upload', formData, config);
      setMenu({
        ...menu,
        foodImage: res.data.path
      });
      // e.target.value = '';
    } catch (err) {
      console.error('Failed to upload!', err);
    }
  };

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
        required
      />
      <input
        type='text'
        placeholder='Ingredients'
        name='ingredients'
        value={ingredients}
        onChange={onChange}
        required
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
        required
      />
      <input
        type='text'
        placeholder='Price'
        name='price'
        value={price}
        onChange={onChange}
        required
      />
      <h5>{current ? 'Update' : 'Upload'} food image</h5>
      <input
        type='file'
        placeholder='Food Image'
        onChange={handleSelectedFile}
      />
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
