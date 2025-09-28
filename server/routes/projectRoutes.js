const express = require('express');
const {getProject} = require('../controllers/projectController');
const router = express.Router();

router.get('/:name/projects/:projectId',getProject);

module.exports = router;
