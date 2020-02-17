import React from 'react';
// import PropTypes from 'prop-types';

const imageSize = { width: '120px', height: '100px' };
const MenuItem = ({ menu }) => {
  const { id, title, ingredients, description, foodImage, price } = menu;
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
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

// MenuItem.propTypes = {
//   menu: PropTypes.object.isRequired
// };

export default MenuItem;
