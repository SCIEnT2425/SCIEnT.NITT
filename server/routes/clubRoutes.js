const express = require('express');
// const { protect } = require('../middleware/auth');
const { getClubsData, getClub, getAllClubs } = require('../controllers/clubController');
const { seedProjects } = require("../controllers/seedController");
const { seedClubs } = require("../seedClubs");
const {getProject} = require("../controllers/projectController")
const router = express.Router();

router.get('/clubdata',getClubsData);
router.get('/:name/projects',getClub);
router.get('/:name/projects/:projectId',getProject);
router.get('/',getAllClubs);
router.post("/projects", seedProjects);
router.post("/seedclubs", seedClubs);

module.exports = router;