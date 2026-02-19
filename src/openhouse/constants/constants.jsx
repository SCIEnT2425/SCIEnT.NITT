// =====================
// IMAGE IMPORTS
// =====================

// sponsors
import boeing from "../../assets/Sponsors/boeing.jpeg";
import bpcl from "../../assets/Sponsors/BPCL.jpeg"  ;
import cisco from "../../assets/Sponsors/CISCO.jpeg";
import isro from "../../assets/Sponsors/ISRO.jpeg";
import ge from "../../assets/Sponsors/GEHealthCare.jpeg";
import campusFund from "../../assets/campusfund.jpeg";
import in44 from "../../assets/in44.jpeg";

// year cards
import defaultImg from "../../assets/projects/default.jpg";

// projects
import rov from "../../assets/projects/rov.jpg";
import drone from "../../assets/projects/drone.jpg";
import quadruped from "../../assets/projects/quadruped.jpg";
import gym from "../../assets/projects/gym.jpg";
import chat from "../../assets/projects/chat.jpg";
import anpr from "../../assets/projects/anpr.jpg";
import chatbot from "../../assets/projects/chatbot.jpg";
import emotion from "../../assets/projects/emotion.jpg";
import analytics from "../../assets/projects/analytics.jpg";
import cli from "../../assets/projects/cli.jpg";
import face from "../../assets/projects/face.jpg";
import solidrocket from "../../assets/projects/solidrocket.jpg";
import rocket from "../../assets/projects/rocket.jpg";
import pulsejet from "../../assets/projects/pulsejet.jpg";
import flightpc from "../../assets/projects/flightpc.jpg";
import turbojet from "../../assets/projects/turbojet.jpg";
import cansat from "../../assets/projects/cansat.jpg";
import agaxtra1 from "../../assets/projects/agaxtra1.jpg";
import agaxtra2 from "../../assets/projects/agaxtra2.jpg";
import agaxtra3 from "../../assets/projects/agaxtra3.jpg";
import aerovision from "../../assets/projects/aerovision.jpg";
import racingdrone from "../../assets/projects/racingdrone.jpg";
import autodrone from "../../assets/projects/autodrone.jpg";
import skyrex from "../../assets/projects/skyrex.jpg";
import roboware from "../../assets/projects/roboware.jpg";
import satelite from "../../assets/projects/satelite.jpg";
import geometry from "../../assets/projects/geometry.jpg";
import panelheat from "../../assets/projects/panelheat.jpg";
import lsrm from "../../assets/projects/lsrm.jpg";
import heatx from "../../assets/projects/heatx.jpg";
import batteryfin from "../../assets/projects/batteryfin.jpg";
import heatpipe from "../../assets/projects/heatpipe.jpg";
import hvac from "../../assets/projects/hvac.jpg";

// Previous edition images
import img1 from "../../assets/previous_editions/IMG_9802.JPG";
import img2 from "../../assets/previous_editions/IMG_9806.JPG";
import img3 from "../../assets/previous_editions/IMG_9807.JPG";
import img4 from "../../assets/previous_editions/IMG_9809.JPG";
import img5 from "../../assets/previous_editions/IMG_9821.JPG";
import img6 from "../../assets/previous_editions/IMG_9823.JPG";
import img7 from "../../assets/previous_editions/IMG_9707.JPG";
import img8 from "../../assets/previous_editions/IMG_9725.JPG";
import img9 from "../../assets/previous_editions/IMG_9727.JPG";
import img10 from "../../assets/previous_editions/IMG_9742.JPG";
import img11 from "../../assets/previous_editions/IMG_9743.JPG";
import img12 from "../../assets/previous_editions/IMG_9826.JPG";
import img13 from "../../assets/previous_editions/IMG_9855.JPG";
import img14 from "../../assets/previous_editions/IMG_9864.JPG";
import img15 from "../../assets/previous_editions/IMG_9879.JPG";
import img16 from "../../assets/previous_editions/IMG_9907.JPG";
import img17 from "../../assets/previous_editions/IMG_9779.JPG";
import img18 from "../../assets/previous_editions/IMG_9774.JPG";
import img19 from "../../assets/previous_editions/IMG_9834.JPG";
import img20 from "../../assets/previous_editions/IMG_9754.JPG";




// =====================
// YEARS
// =====================

export const years = [
  {
    imageurl: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10],
    batch: "2025",
    projects: "50+",
    visitors: "9000+",
  },
  {
    imageurl: [img11, img12, img13, img14, img15, img16, img17, img18, img19, img20],
    batch: "2024",
    projects: "30+",
    visitors: "6000+",
  },
];

// =====================
// SPONSORS
// =====================

export const sponsors = [
  { name: "Boeing", logo: boeing },
  {name: "BPCL", logo: bpcl },
  {name: "CISCO", logo: cisco },
  {name: "ISRO", logo: isro },
  {name: "GE Healthcare", logo: ge },
  { name: "Campus Fund", logo: campusFund },
  { name: "IN4 Capital", logo: in44 },

];

// =====================
// PREVIOUS EDITION IMAGES
// =====================

const previos_edition_images = [

]
// =====================
// PROJECTS
// =====================

export const projects = [
  {
    imageurl: rov,
    domain: "Robotics",
    name: "ROVIO",
    description: "Remotely operated underwater robot for inspection and operations.",
  },
  {
    imageurl: drone,
    domain: "Aerial Systems",
    name: "Autonomous Drone",
    description: "Drone capable of manual and autonomous payload delivery.",
  },
  {
    imageurl: quadruped,
    domain: "Robotics",
    name: "JAGUAR",
    description: "Quadruped robot designed for movement on rugged terrain.",
  },
  {
    imageurl: null,
    domain: "Robotics",
    name: "Prosthetic Arm",
    description: "EMG-based robotic arm for intuitive human control.",
  },
  {
    imageurl: null,
    domain: "Robotics",
    name: "All-Terrain AMR",
    description: "Autonomous mobile robot for navigation and payload transport.",
  },
  {
    imageurl: gym,
    domain: "Computer Vision",
    name: "AI Gym Assistant",
    description: "Real-time workout posture and repetition tracking using vision models.",
  },
  {
    imageurl: chat,
    domain: "Computer Vision + NLP",
    name: "Image Chat App",
    description: "Chat application that understands images and text together.",
  },
  {
    imageurl: anpr,
    domain: "Computer Vision",
    name: "Automated Number Plate Reading",
    description: "Vehicle and license plate detection from images and video.",
  },
  {
    imageurl: chatbot,
    domain: "NLP",
    name: "College Website Chatbot",
    description: "Text-based chatbot for college information and queries.",
  },
  {
    imageurl: emotion,
    domain: "Computer Vision",
    name: "Emotion-Adaptive Background",
    description: "Facial emotion detection with dynamic background changes.",
  },
  {
    imageurl: analytics,
    domain: "NLP",
    name: "Excel Analytics Chatbot",
    description: "Natural language queries converted into insights from Excel data.",
  },
  {
    imageurl: cli,
    domain: "NLP",
    name: "Jarvis Jr",
    description: "Natural language interface for command-line operations.",
  },
  {
    imageurl: face,
    domain: "Computer Vision",
    name: "Celebrity Look-Alike Model",
    description: "Face matching system to find similar celebrities.",
  },
  {
    imageurl: solidrocket,
    domain: "Rocketry",
    name: "Solid Rocket Motor",
    description: "Independently developed solid propulsion system for high-thrust testing.",
  },
  {
    imageurl: rocket,
    domain: "Rocketry",
    name: "Rocket",
    description: "Complete rocket structure developed for propulsion and flight experiments.",
  },
  {
    imageurl: pulsejet,
    domain: "Rocketry",
    name: "Pulse Jet",
    description: "Metal-fabricated pulse jet engine for propulsion experimentation.",
  },
  {
    imageurl: flightpc,
    domain: "Rocketry",
    name: "MegaMind Flight Computer",
    description: "Embedded control system for real-time rocket monitoring and stability.",
  },
  {
    imageurl: turbojet,
    domain: "Rocketry",
    name: "Micro Turbojet",
    description: "Compact gas turbine engine built for experimental thrust generation.",
  },
  {
    imageurl: cansat,
    domain: "Rocketry",
    name: "NASA CanSat",
    description: "Mini satellite payload designed for descent control and data collection.",
  },
  {
    imageurl: agaxtra1,
    domain: "Rocketry",
    name: "Agaxtra MK-1",
    description: "Solid-propellant test rocket developed for low-altitude launches.",
  },
  {
    imageurl: agaxtra2,
    domain: "Rocketry",
    name: "Agaxtra MK-2",
    description: "Competition-grade solid rocket with CanSat payload capability.",
  },
  {
    imageurl: agaxtra3,
    domain: "Rocketry",
    name: "Agaxtra MK-3",
    description: "Advanced solid rocket under development for international competition.",
  },
  {
    imageurl: aerovision,
    domain: "Aerial Systems",
    name: "Aerovision",
    description: "Caged quadcopter designed for safe navigation in confined spaces.",
  },
  {
    imageurl: racingdrone,
    domain: "Aerial Systems",
    name: "Racing Drone",
    description: "High-speed FPV drone built for racing and aerial filming.",
  },
  {
    imageurl: autodrone,
    domain: "Aerial Systems",
    name: "Autonomous Drone",
    description: "Quadcopter capable of manual and autonomous payload missions.",
  },
  {
    imageurl: skyrex,
    domain: "Aerial Systems",
    name: "Skyrex Fixed Wing Aircraft",
    description: "RC fixed-wing aircraft designed for payload drop missions.",
  },
  {
    imageurl: roboware,
    domain: "Robotics",
    name: "Roboware",
    description: "Autonomous warehouse robot for payload transport and navigation.",
  },
  {
    imageurl: satelite,
    domain: "Rocketry",
    name: "Sat-Elite",
    description: "Modular CubeSat platform for satellite subsystem testing.",
  },
  {
    imageurl: geometry,
    domain: "Rocketry",
    name: "Bi-Directional Geometry",
    description: "Symmetric pod geometry designed for efficient bidirectional travel.",
  },
  {
    imageurl: panelheat,
    domain: "Thermal Systems",
    name: "Panel Heat Dissipated",
    description: "Thermal analysis of panel structures for heat dissipation.",
  },
  {
    imageurl: lsrm,
    domain: "Thermal Systems",
    name: "LSRM",
    description: "Liquid-cooled motor thermal management system.",
  },
  {
    imageurl: heatx,
    domain: "Thermal Systems",
    name: "Flat Plate Heat Exchanger",
    description: "Compact heat exchanger for efficient thermal transfer.",
  },
  {
    imageurl: batteryfin,
    domain: "Thermal Systems",
    name: "Battery Fin Design",
    description: "Fin-based cooling design for battery heat management.",
  },
  {
    imageurl: heatpipe,
    domain: "Thermal Systems",
    name: "Battery Heat Pipe",
    description: "Heat pipe system for uniform battery temperature control.",
  },
  {
    imageurl: hvac,
    domain: "Thermal Systems",
    name: "Hybrid HVAC",
    description: "Hybrid HVAC concept for controlled cabin thermal conditions.",
  },
];
