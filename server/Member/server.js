const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // Add CORS package
const app = express();
const path = require("path");
const teamRoutes = require('../routes/team.js');
const { default: mongoose } = require("mongoose");


app.use(express.static(path.join(__dirname, ".")));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.use('/api/team', teamRoutes);
const MONGO_URI = "mongodb+srv://sanskar:%23sanskar@cluster0.db0hhre.mongodb.net/TeamDB?appName=Cluster0";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  try {
    console.log("MongoDB connected");

    // Start the server after successful DB connection
    const PORT = 2000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Error during server startup:", err);
    process.exit(1);
  }
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

