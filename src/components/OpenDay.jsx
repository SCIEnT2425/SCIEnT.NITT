import React from 'react';
import GalleryPage from './GalleryPage';
import Open_day_1 from '../assets/Gallery/Openday/OD1.png';
import Open_day_2 from '../assets/Gallery/Openday/OD2.png';
import Open_day_3 from '../assets/Gallery/Openday/OD3.png';
import Open_day_5 from '../assets/Gallery/Openday/OD5.png';
import Open_day_4 from '../assets/Gallery/Openday/OD4.jpg';
import Open_day_6 from '../assets/Gallery/Openday/OD6.jpg';
import Open_day_7 from '../assets/Gallery/Openday/OD7.jpg';
import Open_day_8 from '../assets/Gallery/Openday/OD8.jpg';
import Open_day_9 from '../assets/Gallery/Openday/OD9.jpg';
import Open_day_10 from '../assets/Gallery/Openday/OD10.jpg';
import Open_day_11 from '../assets/Gallery/Openday/OD11.jpg';
import Open_day_12 from '../assets/Gallery/Openday/OD12.jpg';
import Open_day_13 from '../assets/Gallery/Openday/OD13.jpg';

const images = [
  Open_day_1,
  Open_day_2,
  Open_day_3,
  Open_day_4,
  Open_day_5,
  Open_day_6,
  Open_day_7,
  Open_day_8,
  Open_day_9,
  Open_day_10,
  Open_day_11,
  Open_day_12,
  Open_day_13
];

export default function OpenDay() {
  return <GalleryPage heading="Open Day" images={images} />;
}
