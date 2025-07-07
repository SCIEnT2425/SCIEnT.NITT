import React from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

import I1 from "../assets/Gallery/Facility/FC1.jpeg";
import I2 from "../assets/Gallery/Facility/FC2.jpg";
import I3 from "../assets/Gallery/Facility/FC3.JPG";
import I4 from "../assets/Gallery/Facility/FC4.jpg";
import I5 from "../assets/Gallery/Facility/FC5.jpeg";
import I6 from "../assets/Gallery/Facility/FC6.jpg";

import Open_day from "../assets/Gallery/Openday_gallery.png";
import Esummit from "../assets/Gallery/ES_gallery.jpeg";
import Open_house from "../assets/Gallery/openhouse_gallery.jpeg";
import Tranfinite from "../assets/Gallery/Transfinitte/TF1.jpg";

const Gallery = () => {
  return (
    <div className="gallery-page">
      <h1 className="gallery-heading">Gallery</h1>

      <div className="gallery-grid">
        {[I1, I2, I3, I4, I5, I6].map((img, index) => (
          <div key={index} className="card-wrapper">
            <div className="card">
              <img
                src={img}
                alt={`Facility ${index + 1}`}
                className="card-image"
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="gallery-heading">Event Gallery</h2>

      <div className="gallery-grid">
        <div className="card-wrapper">
          <Link to="/open-house" className="card">
            <img src={Open_house} alt="Open House" className="card-image" />
            <div className="card-text">Open House Exhibition</div>
          </Link>
        </div>

        <div className="card-wrapper">
          <Link to="/e-summit" className="card">
            <img src={Esummit} alt="E-Summit" className="card-image" />
            <div className="card-text">E-Summit</div>
          </Link>
        </div>

        <div className="card-wrapper">
          <Link to="/transfinitte" className="card">
            <img src={Tranfinite} alt="Transfinitte" className="card-image" />
            <div className="card-text">Transfinitte</div>
          </Link>
        </div>

        <div className="card-wrapper">
          <Link to="/open-day" className="card">
            <img src={Open_day} alt="Open Day" className="card-image" />
            <div className="card-text">Open Day</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
