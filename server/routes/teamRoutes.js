const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const {seedTeams} = require('../scripts/AddTeamInDB');

// GET /api/team/all - Get all team members
router.get('/all', teamController.getAllTeamMembers);
router.post('/seed', seedTeams);

module.exports = router;