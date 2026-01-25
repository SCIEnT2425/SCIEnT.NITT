const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const teamRoutes = require('./routes/team');
<<<<<<< Updated upstream
=======
const clubRoutes = require('./routes/clubRoutes');
>>>>>>> Stashed changes
// Load environment variables
dotenv.config();

const app = express();

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/team', teamRoutes);
app.use("/api/inventiveForm", require("./inventive/inventiveFormRoutes")); // Add the new route
<<<<<<< Updated upstream
app.use("/api/inventory", require("./routes/inventoryRoutes.js"));
app.use("/api/temp", require("./temporary/temp-route"));
=======
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use('/api/clubs', clubRoutes);
// app.use("/api/temp", require("./temporary/temp-route"));
>>>>>>> Stashed changes


// Error handler middleware
app.use(errorHandler);


connectDB().then(async () => {
  try {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Error during server startup:", err);
    process.exit(1);
  }
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});