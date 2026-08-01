const Project = require('../models/Project');
const Club = require('../models/Club');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('club', 'name logo')
      .sort({ year: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('club');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res) => {
  try {
    const { name, description, club, image, year } = req.body;
    
    // Check if club exists
    const clubExists = await Club.findById(club);
    if (!clubExists) {
      return res.status(404).json({ message: 'Club not found' });
    }

    const project = new Project({
      name,
      description,
      club,
      image,
      year
    });

    const savedProject = await project.save();

    // Push project ID into club's projects array
    clubExists.projects.push(savedProject._id);
    await clubExists.save();

    const populatedProject = await Project.findById(savedProject._id).populate('club');

    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const oldClubId = project.club;
    const newClubId = req.body.club || oldClubId;

    // If club is changing, update both clubs
    if (oldClubId.toString() !== newClubId.toString()) {
      const oldClub = await Club.findById(oldClubId);
      const newClub = await Club.findById(newClubId);

      if (!newClub) {
        return res.status(404).json({ message: 'New club not found' });
      }

      if (oldClub) {
        oldClub.projects.pull(project._id);
        await oldClub.save();
      }

      newClub.projects.push(project._id);
      await newClub.save();
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('club');

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const club = await Club.findById(project.club);
    if (club) {
      club.projects.pull(project._id);
      await club.save();
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
