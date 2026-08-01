const express = require('express');
const { getClubsData, getClub, getAllClubs } = require('../controllers/clubController');
const { seedProjects } = require("../controllers/seedController");
const { getProject } = require("../controllers/projectController");
const router = express.Router();

let seedClubs;
try {
  seedClubs = require("../scripts/seedClubs").seedClubs;
} catch (e) {
  seedClubs = (req, res) => res.status(404).json({ message: "Seed module not available in this environment" });
}

router.get('/clubdata', getClubsData);
router.get('/:name/projects', getClub);
router.get('/:name/projects/:projectId', getProject);
router.get('/', getAllClubs);
router.post("/projects", seedProjects);
router.post("/seedclubs", seedClubs);

module.exports = router;