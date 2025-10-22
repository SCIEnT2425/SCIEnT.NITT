const Club = require("../models/Club");
const Project = require("../models/Project");

exports.getProject = async (req, res) => {
  try {
    const { name, projectId } = req.params;

    // 1️⃣ Find the club (case-insensitive match)
    const club = await Club.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }).populate("projects");

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    // 2️⃣ Find the requested project from club.projects
    const project = club.projects.find(
      (p) => p._id.toString() === projectId
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // 3️⃣ Find other projects from same club in same year
    const otherProjects = club.projects.filter(
      (p) => p.year === project.year && p._id.toString() !== project._id.toString()
    );

    // 4️⃣ Return data
    res.json({
      project,
      otherProjects: otherProjects || [],
      message:
        otherProjects.length === 0
          ? "No other projects found for this year."
          : undefined,
    });
  } catch (err) {
    console.error("Error fetching project details:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
