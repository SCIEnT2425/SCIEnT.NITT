const TeamMember = require('../models/TeamMember'); // Adjust path as needed

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ role: { $nin: ['Faculty Advisor', 'Facility Admin'] } })
      .sort({ order: 1, name: 1 })
      .select('-createdAt'); // Exclude createdAt if not needed

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

// Get single team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member fetched successfully",
      data: teamMember
    });

  } catch (error) {
    console.error("Error in getTeamMemberById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team member",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Faculty Advisors
const getFacultyAdvisors = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Faculty Advisor" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Faculty Advisors fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getFacultyAdvisors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Faculty Advisors",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Facility Admins
const getFacilityAdmins = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Facility Admin" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Facility Admins fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getFacilityAdmins:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Facility Admins",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Cores team members
const getCoresMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: {
          role: {
            $in: [
              "Facility Executive",
              "Internal Affairs Executive",
              "Technical Executive",
              "External Affairs Executive"
            ]
          }
        }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Cores team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getCoresMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Cores team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Managers team members
const getManagersMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Manager" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Managers team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getManagersMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Managers team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Deputy Managers team members
const getDeputyManagersMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Deputy Manager" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Deputy Managers team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getDeputyManagersMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Deputy Managers team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Design team members
const getDesignMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { subteam: "Creatives" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Design team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getDesignMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Design team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Creatives team members
const getCreativesMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { subteam: "Creatives" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Creatives team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getCreativesMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Creatives team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Corporate Communication team members
const getCorporateCommunicationMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { subteam: "Corporate Communications" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Corporate Communication team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getCorporateCommunicationMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Corporate Communication team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get DevOps team members
const getDevopsMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { subteam: "DevOps" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "DevOps team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getDevopsMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch DevOps team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Technical Executive team members
const getTechnicalExecutive = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Technical Executive" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Technical Executive team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getTechnicalExecutive:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Technical Executive team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Facility Executive team members
const getFacilityExecutive = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Facility Executive" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Facility Executive team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getFacilityExecutive:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Facility Executive team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get External Affairs Executive team members
const getExternalAffairsExecutive = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "External Affairs Executive" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "External Affairs Executive team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getExternalAffairsExecutive:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch External Affairs Executive team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Internal Affairs Executive team members
const getInternalAffairsExecutive = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Internal Affairs Executive" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Internal Affairs Executive team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getInternalAffairsExecutive:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Internal Affairs Executive team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Excores team members (all executives combined)
const getExcoresMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: {
          role: {
            $in: [
              "Facility Executive",
              "Internal Affairs Executive",
              "Technical Executive",
              "External Affairs Executive"
            ]
          }
        }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Excores team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getExcoresMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Excores team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Ex-Managers team members
const getExManagersMembers = async (req, res) => {
  try {
    const members = await TeamMember.aggregate([
      {
        $match: { role: "Ex-Manager" }
      },
      {
        $sort: { order: 1, name: 1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          role: 1,
          subteam: 1,
          Department: 1,
          photoUrl: 1,
          linkedin: 1,
          instagram: 1,
          email: 1,
          year: 1,
          description: 1,
          order: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Ex-Managers team members fetched successfully",
      data: members,
      count: members.length
    });

  } catch (error) {
    console.error("Error in getExManagersMembers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Ex-Managers team members",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  getFacultyAdvisors,
  getFacilityAdmins,
  getCoresMembers,
  getManagersMembers,
  getDeputyManagersMembers,
  getDesignMembers,
  getCreativesMembers,
  getCorporateCommunicationMembers,
  getDevopsMembers,
  getTechnicalExecutive,
  getFacilityExecutive,
  getExternalAffairsExecutive,
  getInternalAffairsExecutive,
  getExManagersMembers,
  getExcoresMembers  // Add this line
};