import React from "react";
import "./Footer.css";
import gadget_logo from "../../Image/gadget_logo.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <h3>Get the Latest Deals & More</h3>
        <img src={gadget_logo} alt="logo" />
        <h3>Customer Service +8801758155264</h3>
      </div>
      <div className="footer__bottom">
        <div>
          <h3>About Us</h3>
          <p>About Us</p>
          <p>Order Tracking</p>
        </div>
        <div>
          <h3>Customer Services</h3>
          <p>Terms and Conditions</p>
          <p>Return Policy</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>info@sohi.gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
