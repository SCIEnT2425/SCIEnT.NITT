const TeamMember = require('../models/TeamMember'); // Adjust path as needed
const seedTeams = require('../scripts/AddTeamInDB.js');
// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    console.log("Fetching all team members");
    const teamMembers = await TeamMember.find().sort({ order: 1, name: 1 }).select('-createdAt'); // Exclude createdAt if not needed

    res.status(200).json({
      success: true,
      message: "All team members fetched successfully",
      data: teamMembers,
      count: teamMembers.length
    });

  } catch (error) {
    console.error("Error in getAllTeamMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (teamMember) {
      res.json({ success: true, data: teamMember });
    } else {
      res.status(404).json({ success: false, message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const newTeamMember = new TeamMember(req.body);
    const savedTeamMember = await newTeamMember.save();
    res.status(201).json({ success: true, data: savedTeamMember });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedTeamMember) {
      res.json({ success: true, data: updatedTeamMember });
    } else {
      res.status(404).json({ success: false, message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const deletedTeamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (deletedTeamMember) {
      res.json({ success: true, message: 'Team member deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};