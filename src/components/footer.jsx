import React from "react";
import "./footer.css";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaFacebook,
} from "react-icons/fa";
import logo from "../assets/logo_s.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo-footer">
            <img src={logo} alt="Logo" />
            <h2>SCIEnT, NITT</h2>
          </div>
          <p className="tagline">
            The Student Creativity and Innovation Centre of NIT Trichy, fostering research and prototyping
          </p>
        </div>

        <div className="footer-section">
          <h3>
            <i>Quick Links</i>
          </h3>
          <div className="footer-links">
            <ul className="column1">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/project">Projects</a>
              </li>
            </ul>
            <ul className="column2">
              <li>
                <a href="/Inventory">Inventory</a>
              </li>
              <li>
                <a href="/roombook">Room booking</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <div className="contact-info">
            <p>
              <i className="fas fa-envelope"></i> <p>scient@nitt.edu</p>
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <p>National Institute of Technology
              <br />
              Tiruchirappalli, Tamil Nadu</p>
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/scient_nitt/?hl=en"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/scientnitt/mycompany/"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a href="/contact" aria-label="Email">
              <FaEnvelope />
            </a>
            <a
              href="https://www.facebook.com/ScientNITT/"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
          <p style={{ marginTop: "20px", fontSize: "16px", color: "#888" }}>
            Stay updated with our latest news, events, and projects!
          </p>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>&copy; 2025 SCIEnT NITT. All rights reserved.</p>
        <p>
          Made with <span className="heart">♥</span> by SCIEnT NITT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
