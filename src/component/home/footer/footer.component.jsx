import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Footer.css'

const Footer = () => {
  return (
    <footer className="bg-light text-muted py-4">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Press</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Products</h5>
            <ul className="list-unstyled">
              <li><Link to="category/electronics">Electronics</Link></li>
              <li><Link to="category/accessories">Accessories</Link></li>
              <li><Link to="category/men's-fashion">Men's Fashion</Link></li>
              <li><Link to="category/womens">Womens</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><Link to="#">FAQs</Link></li>
              <li><Link to="#">Shipping</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">Track Order</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Connect With Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/pa.ras.5815/">
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Paraschand5815">
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li>
                <a  href="https://www.instagram.com/paras_thakure/">
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a  href="https://www.linkedin.com/in/paras-chand-99b501225/">
                  <FaLinkedin /> Linkedin
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} PGlamify E-commerce Store. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
