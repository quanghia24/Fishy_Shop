import React from 'react';
import './download.css';
import appStore from '../../asset/app_store.png';
import playStore from '../../asset/play_store.png';
import phoneImage from '../../asset/download1.webp';

const Download = () => {
  return (
    <div id='download' className="app-download-container">
      <div className="app-download-left">
        <h1>DOWNLOAD APP & GET THE VOUCHER!</h1>
        <p>Get 30% off for first transaction using Rondovision mobile app for now.</p>
        <div className="download-buttons">
          <img src={appStore} alt="App Store" />
          <img src= {playStore} alt="Google Play" />
        </div>
      </div>
      <div className="app-download-right">
        <img src={phoneImage} alt="Mobile App Preview" className="phone-image"/>
      </div>
    </div>
  );
};

export default Download;
