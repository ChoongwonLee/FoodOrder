import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/customerViews.css';

const imageSize = { width: '180px', height: '160px' };

const ProductItem = ({ menu }) => {
  const { _id, title, ingredients, description, foodImage, price } = menu;

  return (
    <div className='card bg-light grid-2'>
      <div>
        <h3 className='text-primary text-center lead menu-title'>{title} </h3>
        <ul className='list'>
          {ingredients && (
            <li>
              <p className='text sub'>
                <i className='fas fa-carrot'></i> {ingredients}
              </p>
            </li>
          )}
          {description && (
            <li>
              <p className='text sub'>
                <i className='far fa-comment-alt'></i> {description}
              </p>
            </li>
          )}
          {price && (
            <li>
              <p className='text sub'>
                <i className='fas fa-dollar-sign'></i> {price}
              </p>
            </li>
          )}
        </ul>
        <p className='chooseButton'>
          <Link to={`/selection/${_id}`}>
            <button className='btn btn-primary btn-sm'>Choose</button>
          </Link>
        </p>
      </div>
      <div className='imageBox'>
        <span className='menu-image'>
          <img
            src={`https://won-food-mall.herokuapp.com/uploads/${foodImage}`}
            alt='foodImage'
            style={imageSize}
          />
        </span>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  menu: PropTypes.object.isRequired
};

export default ProductItem;
