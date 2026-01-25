import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Club from "./models/Club.js";
import Project from "./models/Project.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clubsDataPath = path.join(__dirname, "clubsData.json");

const clubsData = JSON.parse(
  fs.readFileSync(clubsDataPath, "utf-8")
);

const DEFAULT_IMAGE = "https://picsum.photos/400/300?random";
const DEFAULT_PASSWORD = "12345";

export const seedClubs = async (req, res) => {
  try {
    let addedClubs = 0;
    let skippedClubs = 0;
    let addedProjects = 0;

    for (const clubData of clubsData) {
      let club = await Club.findOne({
        name: { $regex: new RegExp(`^${clubData.name}$`, "i") },
      });

      if (!club) {
        const defaultUsername =
          clubData.username ||
          clubData.name.toLowerCase().replace(/\s+/g, "");

        club = await Club.create({
          name: clubData.name,
          logo: clubData.logo,
          description: clubData.description || "",
          username: defaultUsername,
          password: clubData.password || DEFAULT_PASSWORD,
          projects: [],
        });

        addedClubs++;
      } else {
        skippedClubs++;
      }

      if (clubData.projects?.length) {
        for (const projectData of clubData.projects) {
          const exists = await Project.findOne({
            name: { $regex: new RegExp(`^${projectData.name}$`, "i") },
            year: projectData.year,
            club: club._id,
          });

          if (exists) continue;

          const project = await Project.create({
            name: projectData.name,
            description:
              projectData.description || "No description provided.",
            year: projectData.year,
            image: projectData.image || DEFAULT_IMAGE,
            club: club._id,
          });

          club.projects.push(project._id);
          addedProjects++;
        }

        await club.save();
      }
    }

    return res.status(201).json({
      message: "Clubs and projects seeded successfully!",
      stats: { addedClubs, skippedClubs, addedProjects },
    });
  } catch (error) {
    console.error("❌ Seeding error:", error);
    return res.status(500).json({ message: "Error seeding clubs and projects" });
  }
};
