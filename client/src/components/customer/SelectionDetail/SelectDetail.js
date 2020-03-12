import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import MenuContext from '../../../context/menu/menuContext';
import AuthContext from '../../../context/auth/authContext';
import OrderContext from '../../../context/order/orderContext';
import '../css/customerViews.css';

// Modal
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('body');

const SelectDetail = props => {
  const menuContext = useContext(MenuContext);
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const menuId = props.match.params.id;

  const { /*menus,*/ getMenuById, /*getMenus,*/ current } = menuContext;
  const { isAuthenticated } = authContext;
  const { addOrder } = orderContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  const [order, setOrder] = useState({
    menuId: ''
  });

  useEffect(() => {
    getMenuById(menuId);
    setOrder({
      ...order,
      menuId
    });
    // eslint-disable-next-line
  }, [current]);

  // useEffect(() => {
  //   getMenus();
  // }, [props.history.location]);

  // Modal state & functions
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddOrder = () => {
    addOrder(order);
    setModalIsOpen(true);
  };

  return (
    <div className='container'>
      <div className='text-center'>
        <h1 className='text-primary s-large'>{current && current.title}</h1>
      </div>
      <div
        className='card select-detail-grid'
        style={{ border: '0.5px solid' }}
      >
        <div className='selected-card'>
          <img
            src={`http://localhost:8000/${current && current.foodImage}`}
            alt='foodImage'
            className='selectedImage'
          />
        </div>
        <div className='card bg-light mobile-card'>
          <ul className='list'>
            {current && (
              <li>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h3 className='lead hide-sm'>Ingredients</h3>
                  <i className='fas fa-carrot' />
                </div>
                <p className='text-center small'>{current.ingredients}</p>
              </li>
            )}
            <br />
            {current && (
              <li>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h3 className='lead hide-sm'>Description</h3>
                  <i className='far fa-comment-alt' />
                </div>
                <p className='text-center small'>{current.description}</p>
              </li>
            )}
            <br />
          </ul>
          <div className='select-detail-buttons'>
            <button
              className='btn btn-primary btn-sm add-button'
              onClick={handleAddOrder}
            >
              Add to order
            </button>
            <button
              className='btn btn-dark btn-sm goback-button'
              onClick={() => props.history.goBack()}
            >
              Go back
            </button>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <h3>Menu Added!</h3>
          <p>To update quantity, go to cart.</p>
          <br />
          <button className='btn btn-dark btn-block' onClick={closeModal}>
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(SelectDetail);
