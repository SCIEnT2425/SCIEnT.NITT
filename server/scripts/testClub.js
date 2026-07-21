const mongoose = require("mongoose");
const Project = require("../models/Project.js");
const Club = require("../models/Club.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/mybooking";

main()
  .then(() => {
    console.log("Connection has been established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// sample project
let sampleProject = {
  name: "Social media education project",
  description:
    "There is a lack of awareness on our campus on basic startup-related topics. By making the basic management concepts easy and understandable by everyone, we hope to make starting up accessible to everyone...",
  image: {
    url: "https://res.cloudinary.com/dsppzymyc/image/upload/v1756464027/taj_mahal_mrjq7l.jpg",
    filename: "taj_mahal_mrjq7l",
  },
};

const initDB = async () => {
  // clear old data
  await Project.deleteMany({});
  await Club.deleteMany({});

  // create club first
  const ecellClub = new Club({
    name: "E-Cell",
    username: "ecell",
    password: "securepassword123", 
    credits: 14,
    logo: "https://example.com/ecell-logo.png",
    isAdmin: false,
    bookingHistory: [],
    projects: [],
  });

  await ecellClub.save();

  const newProj = new Project({
    ...sampleProject,
    club: ecellClub._id, 
  });

  await newProj.save();
  ecellClub.projects.push(newProj._id);
  await ecellClub.save();

  console.log("✅ Club + Project were initialized successfully");
};

initDB();
