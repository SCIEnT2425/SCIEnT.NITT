import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Club from "./models/Club.js";
import Project from "./models/Project.js";

dotenv.config();

// Load clubs data manually
const __dirname = path.resolve();
const clubsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "server/clubsData.json"), "utf-8")
);

const DEFAULT_IMAGE = "https://picsum.photos/400/300?random"; // 🖼️ default project image
const DEFAULT_PASSWORD = "12345"; // default password for seeding

<<<<<<< Updated upstream
const seedClubsAndProjects = async () => {
=======
export const seedClubs = async (req, res) => {
>>>>>>> Stashed changes
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    let addedClubs = 0;
    let skippedClubs = 0;
    let addedProjects = 0;

    for (const clubData of clubsData) {
      // 🔍 Check if club already exists (case-insensitive)
      let club = await Club.findOne({
        name: { $regex: new RegExp(`^${clubData.name}$`, "i") },
      });

      if (club) {
        console.log(`⚠️ Skipping existing club: ${clubData.name}`);
        skippedClubs++;
      } else {
        // ✅ Set defaults for username/password if not present
        const defaultUsername =
          clubData.username || clubData.name.toLowerCase().replace(/\s+/g, "");
        const defaultPassword = clubData.password || DEFAULT_PASSWORD;

        club = await Club.create({
          name: clubData.name,
          logo: clubData.logo,
          description: clubData.description || "",
          username: defaultUsername,
          password: defaultPassword,
        });

        console.log(`✅ Added new club: ${club.name}`);
        addedClubs++;
      }

      // 🧩 Add and link projects (if provided)
      if (clubData.projects && clubData.projects.length > 0) {
        for (const projectData of clubData.projects) {
          // Skip if project with same name + year already exists for this club
          const existingProject = await Project.findOne({
            name: { $regex: new RegExp(`^${projectData.name}$`, "i") },
            year: projectData.year,
            club: club._id,
          });

          if (existingProject) {
            console.log(
              `⚠️ Skipping existing project: ${projectData.name} (${projectData.year}) for ${club.name}`
            );
            continue;
          }

          const project = await Project.create({
            name: projectData.name,
            description: projectData.description || "No description provided.",
            year: projectData.year,
            image: projectData.image || DEFAULT_IMAGE,
            club: club._id, // ✅ add reference to the club
          });

          // Link project to the club
          club.projects.push(project._id);
          await club.save();

          console.log(`✅ Added project: ${project.name} → ${club.name}`);
          addedProjects++;
        }
      }
    }

    console.log(
      `🎉 Done! Added ${addedClubs} new clubs, skipped ${skippedClubs} existing clubs, and added ${addedProjects} new projects.`
    );
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedClubsAndProjects();
