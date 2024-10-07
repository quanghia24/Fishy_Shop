import React from 'react'
import './banner.css'
const Banner = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};
  return (
    <div className="banner">
    <div className="banner-content">
      <h1 className="banner-title">Welcome to FishyShop</h1>
      <p className="banner-subtitle">Your One-Stop Shop for All Electronic Devices</p>
      <p> Spend minimum 100k to get 30% off
            <br />
        Voucher code for your next purchase</p>
        <p>1 October - January 2025</p>
        <br />
        

      <button className="banner-button" onClick={() => scrollToSection('product')}>Shop Now</button>
    </div>
  </div>
  )
}

export default Banner
