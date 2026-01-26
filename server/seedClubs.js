const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const Club = require("./models/Club");

dotenv.config();

// Load JSON
const clubsDataPath = path.join(__dirname, "clubsData.json");
const clubsData = JSON.parse(fs.readFileSync(clubsDataPath, "utf-8"));

const seedClubs = async (req, res) => {
  try {
    let addedClubs = 0;
    let skippedClubs = 0;

    for (const clubData of clubsData) {
      // Normalize name to avoid case issues
      const clubName = clubData.name.trim();

      const existingClub = await Club.findOne({
        name: clubName
      });

      if (existingClub) {
        skippedClubs++;
        continue;
      }

      await Club.create({
        name: clubName,
        logo: clubData.logo || "",
        description: clubData.description || "",
        projects: []
      });

      addedClubs++;
    }

    return res.status(201).json({
      message: "Clubs seeded successfully",
      stats: { addedClubs, skippedClubs }
    });
  } catch (error) {
    console.error("❌ Seeding error:", error);
    return res.status(500).json({
      message: "Error seeding clubs",
      error: error.message
    });
  }
};

module.exports = { seedClubs };
