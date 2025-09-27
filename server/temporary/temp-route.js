// routes/seedRoutes.js
const express = require('express');
const { seedClubs } = require('../temporary/club-controller');
const { seedTools } = require('../temporary/tools-controller');
const router = express.Router();

// Temporary route for seeding clubs using POST
router.post('/seed-clubs', seedClubs);
router.post('/seed-tools', seedTools);

module.exports = router;