const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // Add CORS package
const app = express();
const path = require("path");
const teamRoutes = require('./team');
const { default: mongoose } = require("mongoose");


app.use(express.static(path.join(__dirname, ".")));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.use('/api/team', teamRoutes);

mongoose.connect('mongodb://localhost:27017/TeamDB', {
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

