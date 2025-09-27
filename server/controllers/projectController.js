const Club = require('../models/Club');
const Project = require('../models/Project');

exports.getProject() = async (req, res) => {
     try {
    const club = await Club.findOne({
      name: { $regex: new RegExp(`^${req.params.name}$`, "i") },
    }).populate("projects");

    if (!club) return res.status(404).json({ error: "Club not found" });

    const project = club.projects.find(
      (p) => p._id.toString() === req.params.projectId
    );

    if (!project) return res.status(404).json({ error: "Project not found" });

    const otherProjects = club.projects.filter(
      (p) => p.year === project.year && p._id.toString() !== project._id.toString()
    );

    res.json({ project, otherProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};