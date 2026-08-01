// config/db.js
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env" });

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.ENV_MODE === 'production';

  const localUri = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI_DEV || "mongodb://localhost:27017/scient";
  const atlasUri = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI_PROD || process.env.MONGO_URI || "mongodb://localhost:27017/scient";

  const targetUri = isProduction ? atlasUri : localUri;
  const envName = isProduction ? "Production (Atlas)" : "Development (Local)";

  console.log(`Environment mode: ${isProduction ? 'production' : 'development'}`);
  console.log(`Connecting to ${envName} MongoDB...`);

  try {
    await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB connected successfully to ${envName}`);
  } catch (err) {
    console.warn(`Primary connection to ${envName} (${targetUri}) failed:`, err.message);

    // If development mode and local connection failed, fallback to Atlas so dev server doesn't crash
    if (!isProduction && atlasUri && atlasUri !== localUri) {
      console.log("⚡ Local MongoDB not active. Attempting fallback to MongoDB Atlas...");
      try {
        await mongoose.connect(atlasUri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ Successfully connected to MongoDB Atlas (fallback mode)!");
        return;
      } catch (fallbackErr) {
        console.error("❌ Atlas fallback failed:", fallbackErr.message);
      }
    }

    console.error("Please start local MongoDB (mongod / Docker) or check your connection string.");
    process.exit(1);
  }
};

module.exports = connectDB;


