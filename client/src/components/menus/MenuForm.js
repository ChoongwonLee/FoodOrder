import React, { useState, useContext } from 'react';
import axios from 'axios';
import MenuContext from '../../context/menu/menuContext';

const MenuForm = () => {
  const menuContext = useContext(MenuContext);

  const [menu, setMenu] = useState({
    title: '',
    ingredients: '',
    description: '',
    foodImage: '',
    price: 0.0
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
    menuContext.addMenu(menu);
    setMenu({
      title: '',
      ingredients: '',
      description: '',
      foodImage: '',
      price: 0.0
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Menu</h2>
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
          value='Add Menu'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default MenuForm;
