import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MenuContext from '../../context/menu/menuContext';

const imageSize = { width: '120px', height: '100px' };

const MenuItem = ({ menu }) => {
  const menuContext = useContext(MenuContext);
  const { deleteMenu, setCurrent, clearCurrent } = menuContext;

  const { id, title, ingredients, description, foodImage, price } = menu;

  const onDelete = () => {
    deleteMenu(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}
        <span style={{ float: 'right' }}>
          <img src={foodImage} alt='foodImage' style={imageSize} />
        </span>
      </h3>
      <ul className='list'>
        {ingredients && (
          <li>
            <i className='fas fa-carrot'></i> {ingredients}
          </li>
        )}
        {description && (
          <li>
            <i className='far fa-comment-alt'></i> {description}
          </li>
        )}
        {price && (
          <li>
            <i className='fas fa-dollar-sign'></i> {price}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(menu)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

MenuItem.propTypes = {
  menu: PropTypes.object.isRequired
};

export default MenuItem;
