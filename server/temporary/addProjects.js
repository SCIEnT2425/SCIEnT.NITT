require("dotenv").config();
const Project = require("../models/Project");
const Club = require("../models/Club");

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
  orbitProjects
} = require("./allProjects");

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
  "ORBIT"
];

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
  9: orbitProjects
};

/**
 * @desc Seed projects for a single club
 * @route POST /api/seed/projects/:index
 * @access Admin / Dev
 */
const seedProjects = async (req, res) => {
  try {
    const index = Number(req.params.index);

    if (isNaN(index) || !clubMap[index]) {
      return res.status(400).json({ message: "Invalid club index" });
    }

    const clubName = clubNames[index];
    const projectsData = clubMap[index];

    const currClub = await Club.findOne({ name: clubName });

    if (!currClub) {
      return res.status(404).json({
        message: `Club "${clubName}" not found`
      });
    }

    // Delete old projects
    const deleted = await Project.deleteMany({ club: currClub._id });

    // Prepare new projects
    const projectsToInsert = projectsData.map(proj => ({
      name: proj.name,
      description: proj.description,
      year: proj.year,
      image: proj.image || {},
      club: currClub._id
    }));

    const inserted = await Project.insertMany(projectsToInsert);

    // Update club reference
    currClub.projects = inserted.map(p => p._id);
    await currClub.save();

    res.status(201).json({
      message: `Projects seeded successfully for ${clubName}`,
      deletedCount: deleted.deletedCount,
      insertedCount: inserted.length
    });
  } catch (error) {
    console.error("Project seeding error:", error);
    res.status(500).json({
      message: "Error seeding projects",
      error: error.message
    });
  }
};

module.exports = {
  seedProjects
};
