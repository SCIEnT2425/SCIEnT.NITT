import React from "react";
import GalleryPage from "./GalleryPage";

import Openhouse2 from "../assets/Gallery/Openhouse/OH2.JPG";
import Openhouse3 from "../assets/Gallery/Openhouse/OH3.JPG";
import Openhouse4 from "../assets/Gallery/Openhouse/OH4.JPG";
import Openhouse5 from "../assets/Gallery/Openhouse/OH5.JPG";
import Openhouse6 from "../assets/Gallery/Openhouse/OH6.JPG";
import Openhouse7 from "../assets/Gallery/Openhouse/OH7.JPG";
import Openhouse8 from "../assets/Gallery/Openhouse/OH8.JPG";
import Openhouse9 from "../assets/Gallery/Openhouse/OH9.JPG";
import Openhouse10 from "../assets/Gallery/Openhouse/OH10.jpg";
import Openhouse11 from "../assets/Gallery/Openhouse/OH11.JPG";
import Openhouse12 from "../assets/Gallery/Openhouse/OH12.jpg";
import Openhouse13 from "../assets/Gallery/Openhouse/OH13.jpg";
import Openhouse14 from "../assets/Gallery/Openhouse/OH14.jpg";
import Openhouse1 from "../assets/Gallery/Openhouse/OH1.JPG";

const images = [
  Openhouse1,
  Openhouse2,
  Openhouse3,
  Openhouse4,
  Openhouse5,
  Openhouse6,
  Openhouse7,
  Openhouse8,
  Openhouse9,
  Openhouse10,
  Openhouse11,
  Openhouse12,
  Openhouse13,
  Openhouse14
];

export default function OpenHouse() {
  return <GalleryPage heading="Open House Exhibition" images={images} />;
}
