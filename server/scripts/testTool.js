const mongoose = require("mongoose");
const Tool = require("../models/Tool.js");

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
let sampleTool = {
  name: "Bambu Lab 3D Printer",
  description:
    "Bambu Lab 3D printers are known for their revolutionary speed, user-friendliness, and high-quality prints, often working right out of the box with minimal setup",
 category:"3D Printing",
 quantity:1,
  image: {
    url: "https://res.cloudinary.com/dsppzymyc/image/upload/v1756466206/Test_otvfag.png",
    filename: "Test_otvfag",
  },
};

const initDB = async () => {
  // clear old data
    await Tool.deleteMany({});

  // create club first
  

  const newTool = new Tool({
    ...sampleTool, 
  });

  await newTool.save();


  console.log("Tool were initialized successfully");
};

initDB();
