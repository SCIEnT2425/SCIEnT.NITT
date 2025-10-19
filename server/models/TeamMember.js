const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  role: {
    type: String,
    required: true,
    enum: [
      "Faculty Advisor",
      "Core Member",
      "Manager",
      "Deputy Manager",
      "Ex-Manager",
      "Facility Admin",
      "Technical Executive",
      "Facility Executive",
      "External Affairs Executive",
      "Internal Affairs Executive",
    ]
  },

  subteam: {
    type: String,
    enum: [
      null,
      "DevOps",
      "Corporate Communications",
      "Creatives",
    ],
    default: null
  },

  Department: {
    type: String,
    default: null
  },

  photoUrl: {
    type: String,
    default: "/Team/default.jpg"
  },

  linkedin: {
    type: String,
    default: ""
  },

  instagram: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    default: ""
  },

  year: {
    type: String,
    default: null
  },

  description: {
    type: String,
    default: ""
  },

  order: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster filtering by role or subteam
teamMemberSchema.index({ role: 1, subteam: 1 });
teamMemberSchema.index({ role: "text" });
// Static method to fetch Faculty Advisors
teamMemberSchema.statics.getFacultyAdvisors = function() {
  return this.find({ role: "Faculty Advisor" }).sort({ order: 1 });
};

// Static method to fetch Facility Executives
teamMemberSchema.statics.getFacilityExecutives = function() {
  return this.find({ role: "Facility Executive" }).sort({ order: 1 });
};
teamMemberSchema.statics.getInternalAffairsExecutives = function() {
  return this.find({ role: "Internal Affairs Executive" }).sort({ order: 1 });
};
teamMemberSchema.statics.getExternalAffairsExecutives = function() {
  return this.find({ role: "External Affairs Executive" }).sort({ order: 1 });
};
teamMemberSchema.statics.getTechnicalExecutives = function() {
  return this.find({ role: "Technical Executive" }).sort({ order: 1 });
};
teamMemberSchema.statics.getFacilityAdmins = function() {
  return this.find({ role: "Facility Admin" }).sort({ order: 1 });
};  

const TeamMember = mongoose.model("TeamMember", teamMemberSchema, "TeamMembers");

module.exports = TeamMember;

