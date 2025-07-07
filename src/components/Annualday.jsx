import React from "react";
import GalleryPage from "./GalleryPage";

import Annualday2 from "../assets/Gallery/Annualday/AD2.JPG";
import Annualday3 from "../assets/Gallery/Annualday/AD3.JPG";
import Annualday4 from "../assets/Gallery/Annualday/AD4.JPG";
import Annualday5 from "../assets/Gallery/Annualday/AD5.JPG";
import Annualday6 from "../assets/Gallery/Annualday/AD6.JPG";
import Annualday7 from "../assets/Gallery/Annualday/AD7.JPG";
import Annualday8 from "../assets/Gallery/Annualday/AD8.JPG";
import Annualday9 from "../assets/Gallery/Annualday/AD9.JPG";
import Annualday10 from "../assets/Gallery/Annualday/AD10.JPG";
import Annualday11 from "../assets/Gallery/Annualday/AD11.JPG";
import Annualday12 from "../assets/Gallery/Annualday/AD12.JPG";
import Annualday13 from "../assets/Gallery/Annualday/AD13.JPG";
import Annualday14 from "../assets/Gallery/Annualday/AD14.JPG";
import Annualday1 from "../assets/Gallery/Annualday/AD1.jpg";

const images = [
  Annualday1,
  Annualday2,
  Annualday3,
  Annualday4,
  Annualday5,
  Annualday6,
  Annualday7,
  Annualday8,
  Annualday9,
  Annualday10,
  Annualday11,
  Annualday12,
  Annualday13,
  Annualday14
];

export default function AnnualdayGallery() {
  return <GalleryPage heading="ANNUAL DAY'25" images={images} />;
}
