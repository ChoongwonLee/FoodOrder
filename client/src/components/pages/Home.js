import React from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import FadeIn from 'react-fade-in';

const imageSize = { width: '100vh', height: '40vh' };

const Home = () => {
  return (
    <div className='container'>
      <div>
        <FadeIn transitionDuration={3500}>
          <p className='text-dark text-center large hide-sm'>Welcome!</p>
        </FadeIn>
      </div>
      <br className='hide-sm' />
      <Carousel
        autoPlay={true}
        interval={3500}
        infiniteLoop={true}
        showThumbs={false}
      >
        <div>
          <img
            src={process.env.PUBLIC_URL + 'images/food1.png'}
            alt=''
            style={imageSize}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + 'images/food2.jpg'}
            alt=''
            style={imageSize}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + 'images/food3.jpg'}
            alt=''
            style={imageSize}
          />
        </div>
      </Carousel>
      <div className='card bg-light'>
        <p className='text-primary text-center lead'>How to use this app?</p>
        <div style={{ justifyContent: 'center' }}>
          <FadeIn transitionDuration={4500} delay={1200}>
            <p className='text-center sub'>1. Fill out delievery info.</p>
            <p className='text-center sub'>2. Select your food.</p>
            <p className='text-center sub'>3. Check your email.</p>
          </FadeIn>
        </div>
        <br />
        <p className='text-center sub'>To Test admin mode, go to Admin</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to='/customer'>
          <button className='btn btn-primary'>START</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
