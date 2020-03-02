import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const imageSize = { width: '180px', height: '160px' };

const ProductItem = ({ menu }) => {
  const { _id, title, ingredients, description, foodImage, price } = menu;

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
        <Link to={`/selection/${_id}`}>
          <button className='btn btn-primary btn-sm'>Choose</button>
        </Link>
      </p>
    </div>
  );
};

ProductItem.propTypes = {
  menu: PropTypes.object.isRequired
};

export default ProductItem;
