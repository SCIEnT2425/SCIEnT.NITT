const mongoose = require("mongoose");
const tools = require("./allTools.js");
const Tool = require("../models/Tool.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/mybooking";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connection has been established");
  await initDB();
}

const initDB = async () => {
  await Tool.deleteMany({});
  console.log(tools);
  await Tool.insertMany(tools);
  console.log("Data was initialized");
};

main()