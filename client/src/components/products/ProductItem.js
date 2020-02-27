import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MenuContext from '../../context/menu/menuContext';

const imageSize = { width: '180px', height: '160px' };

const ProductItem = ({ menu }) => {
  // eslint-disable-next-line
  const menuContext = useContext(MenuContext);

  const { _id, title, ingredients, description, foodImage, price } = menu;

  const [order, setOrder] = useState({
    customer: null,
    menus: null
  });

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}
        <span style={{ float: 'right' }}>
          <img
            src={`http://localhost:8000/${foodImage}`}
            alt='foodImage'
            style={imageSize}
          />
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
        <button className='btn btn-primary btn-sm'>Add</button>
      </p>
    </div>
  );
};

ProductItem.propTypes = {
  menu: PropTypes.object.isRequired
};

export default ProductItem;
