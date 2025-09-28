require("dotenv").config();
const mongoose = require("mongoose");
const tools = require("./allTools.js");
const Tool = require("../models/Tool.js");
<<<<<<< HEAD


const MONGO_URL = "mongodb+srv://teamscientnitt_db_user:3fZHjlzXikFMCcll@cluster0.tzt6mma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

=======

const MONGO_URL = "mongodb+srv://teamscientnitt_db_user:3fZHjlzXikFMCcll@cluster0.tzt6mma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
>>>>>>> 7ba90b764b66f9d5e46485615e1a2180f2242018

async function main() {
  console.log("MONGO_URL:", MONGO_URL);
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

main();
