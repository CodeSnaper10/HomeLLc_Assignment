import React, { useEffect } from 'react';
import Shape from './Shape.png';

const Imagepage = ({ onToggleFetchData, apiData }) => {
  useEffect(() => {
    document.body.classList.add('body-with-background');
    return () => {
      document.body.classList.remove('body-with-background');
    };
  }, []);

  const handleLiveClick = () => {
    onToggleFetchData();
  };

  return (
    <div className='container'>
      <div className='image-content'>
        <div className='close-tab'>
          <button className='closetab-button' onClick={handleLiveClick}>&times;</button>
          <button className='live-tab' onClick={handleLiveClick}>LIVE</button>
        </div>
        <div className='homepage-content'>
          <div className='current-location'>
            <img src={Shape} alt='location-icon' className='loc-shape'/>  
            <p className='cur-loc'>Current Location</p>
          </div>
          <div className='location-name'>
            {apiData ? apiData.location.name : ''}, <br/>
            {apiData ? apiData.location.country : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imagepage;
