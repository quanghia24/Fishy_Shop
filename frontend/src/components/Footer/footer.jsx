import {Container, Row, Col} from "react-bootstrap";
import React from 'react'
import './footer.css'
const Footer = () => {
  return(
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src="" alt="" />
            <h2>FISHY SHOP</h2>
            <p>Fishy Shop is your go-to destination for all the latest 
              technology devices.</p>
            <div className="footer-social-icons">
               
            </div>
        </div>
        <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <p>+084 123-456-789</p>
            <p>FishyShop@gmail.com</p>
        </ul>
        </div>
        <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
           <p>Home</p>
           <p>Product</p>
           <p>Latest News</p>
           <p>About us</p>
        </ul>
        </div>
      </div>
      <p className="footer-copyright">Copyright 2024 FishyShop.com - All right reserved.</p>
    </div>
  )
}

export default Footer;