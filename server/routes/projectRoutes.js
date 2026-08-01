const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectCrudController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(getAllProjects)
  .post(protect, adminOnly, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, adminOnly, updateProject)
  .delete(protect, adminOnly, deleteProject);

module.exports = router;
