const mongoose = require("mongoose");
const Project = require("../models/Project.js");
const Club = require("../models/Club.js");

const clubNames = [
  "E-Cell",
  "SPIDER",
  "FORCE HYPERLOOP",
  "DESIGNERS CONSORTIUM",
  "RMI",
  "PSI",
  "EVER",
  "3D AERODYNAMICS",
  "DATABYTE",
  "ORBIT",
];

const seedProjects = async (req, res) => {
  try {
    let allProjectsData;
    try {
      allProjectsData = require("../scripts/allProjects.js");
    } catch (e) {
      return res.status(404).json({ message: "Seed data not available in this environment" });
    }

    const {
      rmiProjects,
      dcProjects,
      everProjects,
      ecellProjects,
      spiderProjects,
      psiProjects,
      forceHyperloopProject,
      dataByteProjects,
      threeDProjects,
      orbitProjects,
    } = allProjectsData;

    const clubMap = {
      0: ecellProjects,
      1: spiderProjects,
      2: forceHyperloopProject,
      3: dcProjects,
      4: rmiProjects,
      5: psiProjects,
      6: everProjects,
      7: threeDProjects,
      8: dataByteProjects,
      9: orbitProjects,
    };

    let totalInserted = 0;

    for (let i = 0; i < clubNames.length; i++) {
      const clubName = clubNames[i];

      const currClub = await Club.findOne({ name: clubName });
      if (!currClub) {
        console.warn(`⚠️ Club "${clubName}" not found, skipping`);
        continue;
      }

      await Project.deleteMany({ club: currClub._id });

      const projectsToInsert = clubMap[i].map((proj) => ({
        name: proj.name,
        description: proj.description,
        year: proj.year,
        image: proj.image || "",
        club: currClub._id,
      }));

      const inserted = await Project.insertMany(projectsToInsert);
      totalInserted += inserted.length;

      currClub.projects = inserted.map((p) => p._id);
      await currClub.save();

      console.log(`✅ Seeded ${inserted.length} projects for club "${clubName}"`);
    }

    res.status(201).json({
      message: "Projects seeded successfully!",
      totalProjectsInserted: totalInserted,
    });
  } catch (error) {
    console.error("❌ Project seeding error:", error);
    res.status(500).json({ message: "Error seeding projects" });
  }
};

module.exports = { seedProjects };