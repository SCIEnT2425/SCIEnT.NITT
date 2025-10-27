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
      "Manager",
      "Deputy Manager",
      "Ex-Manager",
      "Admin Executive" ,
      "Technical Executive",
      "Facility Executive",
      "External Affairs Executive",
      "Internal Affairs Executive",
      "Project Management Head",
    ]
  },

  subteam: {
    type: String,
    enum: [
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
    default: null
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

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;