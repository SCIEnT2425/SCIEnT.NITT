const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const {seedTeams} = require('../scripts/AddTeamInDB');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/team/all - Get all team members
router.get('/all', teamController.getAllTeamMembers);
router.post('/seed', seedTeams);

router.get('/:id', teamController.getTeamMemberById);
router.post('/', protect, adminOnly, teamController.createTeamMember);
router.put('/:id', protect, adminOnly, teamController.updateTeamMember);
router.delete('/:id', protect, adminOnly, teamController.deleteTeamMember);

module.exports = router;