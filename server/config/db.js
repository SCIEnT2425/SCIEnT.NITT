// config/db.js
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env" });

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.ENV_MODE === 'production';

  const localUri = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI_DEV || "mongodb://localhost:27017/scient";
  const atlasUri = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI_PROD || process.env.MONGO_URI || "mongodb://localhost:27017/scient";

  const targetUri = (isProduction ? atlasUri : localUri) || process.env.MONGO_URI || "mongodb://localhost:27017/scient";
  const envName = isProduction ? "Production (Atlas)" : "Development (Local)";

  console.log(`Environment mode: ${isProduction ? 'production' : 'development'}`);
  console.log(`Connecting to ${envName} MongoDB...`);

  try {
    await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected successfully to ${envName}`);
  } catch (err) {
    console.error(`Error connecting to ${envName} MongoDB (${targetUri}):`, err.message);
    if (!isProduction) {
      console.warn("Please ensure MongoDB service is running locally on port 27017 (e.g. `mongod` or Docker container).");
    }
    process.exit(1);
  }
};

module.exports = connectDB;

