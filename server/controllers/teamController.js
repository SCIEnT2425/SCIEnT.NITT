const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const TeamMember = require('../models/TeamMember');
const { getBucket } = require('../config/firebaseConfig');
const { resizeTeamPhoto, uploadTeamPhoto } = require('../utils/teamPhotos');

const LOCAL_STORE_FILE = path.join(__dirname, '../data/local_team_members.json');

// Helper to read local JSON store
const readLocalStore = () => {
  try {
    if (!fs.existsSync(LOCAL_STORE_FILE)) {
      return [];
    }
    const content = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading local team store:', err);
    return [];
  }
};

// Helper to write local JSON store
const writeLocalStore = (data) => {
  try {
    fs.mkdirSync(path.dirname(LOCAL_STORE_FILE), { recursive: true });
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local team store:', err);
  }
};

const isDbConnected = () => mongoose.connection.readyState === 1;

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    if (isDbConnected()) {
      const teamMembers = await TeamMember.find().sort({ order: 1, name: 1 }).select('-createdAt');
      return res.status(200).json({
        success: true,
        message: 'All team members fetched successfully',
        data: teamMembers,
        count: teamMembers.length,
      });
    }

    // Fallback when MongoDB is offline
    const localData = readLocalStore();
    return res.status(200).json({
      success: true,
      message: "All team members fetched successfully",
      data: localData,
      count: localData.length
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
    // Surface Mongoose validation errors as 400 Bad Request so the
    // frontend can display the exact field-level message to the admin.
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message).join('; ');
      return res.status(400).json({ success: false, message: messages });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedTeamMember) {
      res.json({ success: true, data: updatedTeamMember });
    } else {
      res.status(404).json({ success: false, message: 'Team member not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message).join('; ');
      return res.status(400).json({ success: false, message: messages });
    }
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

/**
 * Start a new year's team from the previous one.
 *
 * Body: { fromYear: "26-27", toYear: "27-28", members: [{ id, role, subteam }] }
 * Each listed member of fromYear is copied into toYear with the given role and
 * sub-team (promotion, same role, or a Core role); members left out are not
 * carried over. Members already in toYear (same name) are skipped, so running
 * it twice doesn't create duplicates. New inductees are added separately.
 */
const carryOverTeam = async (req, res) => {
  try {
    const { fromYear, toYear, members } = req.body || {};
    if (!TeamMember.isTeamYear(fromYear) || !TeamMember.isTeamYear(toYear) || !fromYear || !toYear || fromYear === toYear) {
      return res.status(400).json({ success: false, message: 'fromYear and toYear must be two different team years like "26-27"' });
    }
    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ success: false, message: 'Select at least one member to carry over' });
    }

    const sources = await TeamMember.find({ _id: { $in: members.map(m => m.id) }, year: fromYear }).lean();
    const sourceById = new Map(sources.map(s => [String(s._id), s]));
    const nameKey = (name) => name.trim().toLowerCase();
    const existing = new Set((await TeamMember.find({ year: toYear }, 'name').lean()).map(m => nameKey(m.name)));

    const docs = [];
    const skipped = [];
    for (const { id, role, subteam } of members) {
      const source = sourceById.get(String(id));
      if (!source) {
        return res.status(400).json({ success: false, message: `Member ${id} is not in the ${fromYear} team` });
      }
      if (existing.has(nameKey(source.name))) {
        skipped.push(source.name);
        continue;
      }
      const { _id, __v, createdAt, ...details } = source;
      const doc = new TeamMember({ ...details, year: toYear, role, subteam });
      const invalid = doc.validateSync();
      if (invalid) {
        const messages = Object.values(invalid.errors).map(e => e.message).join('; ');
        return res.status(400).json({ success: false, message: `${source.name}: ${messages}` });
      }
      docs.push(doc);
      existing.add(nameKey(source.name));
    }

    const created = docs.length ? await TeamMember.insertMany(docs) : [];
    res.status(201).json({
      success: true,
      message: `Carried ${created.length} member(s) over to ${toYear}`,
      data: { created: created.length, skipped },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Upload a team member photo to Firebase Storage.
 *
 * Expects multer memoryStorage → req.file contains:
 *   buffer, originalname, mimetype
 *
 * Optional query params to build the storage path:
 *   ?year=24-25   (omit for faculty/admin → stored under 'admin' subfolder)
 *   ?memberId=<mongoId>  (used as filename prefix for uniqueness)
 *
 * Storage path convention (matches existing Firebase bucket structure):
 *   Team/team-members/<year>/<memberId>_<filename>   — student members
 *   Team/team-members/admin/<memberId>_<filename>    — faculty / admin
 *
 * Returns: { success, message, data: { url, storagePath } }
 */
const uploadTeamMemberImage = async (req, res) => {
  try {
    // 1. Validate file presence
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: 'No image file was provided. Please select an image to upload.',
      });
    }

    // 2. Validate Firebase is configured
    const bucket = getBucket();
    if (!bucket) {
      return res.status(503).json({
        success: false,
        message: 'Firebase Storage is not configured. Check FIREBASE_* environment variables.',
      });
    }

    // 3. Build destination path (always .jpg: the photo is re-encoded below)
    const { year, memberId } = req.query;
    const subfolder = year ? year : 'admin';
    const prefix    = memberId ? `${memberId}_` : `${Date.now()}_`;
    const safeName  = req.file.originalname.replace(/\.[^.]*$/, '').replace(/[^a-zA-Z0-9._-]/g, '_');
    const destPath  = `Team/team-members/${subfolder}/${prefix}${safeName}.jpg`;

    // 4. Resize (phone photos are often 5-8 MB) and upload to Firebase Storage
    let resized;
    try {
      resized = await resizeTeamPhoto(req.file.buffer);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'That file could not be read as an image.' });
    }
    const downloadUrl = await uploadTeamPhoto(bucket, destPath, resized);

    console.log(`[Firebase] Uploaded → ${destPath}`);

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Firebase Storage',
      data: {
        url: downloadUrl,
        storagePath: destPath,
      },
    });
  } catch (error) {
    console.error('Error uploading team member image to Firebase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  carryOverTeam,
  uploadTeamMemberImage,
};