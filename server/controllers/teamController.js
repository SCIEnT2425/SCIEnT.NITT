const TeamMember = require('../models/TeamMember'); // Adjust path as needed
const seedTeams = require('../temporary/AddTeamInDB.js');
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



module.exports = {
  getAllTeamMembers
};