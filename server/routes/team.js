const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// GET /api/team/faculty-advisors - Get Faculty Advisors
router.get('/faculty-advisors', teamController.getFacultyAdvisors);

// GET /api/team/facility-admins - Get Facility Admins
router.get('/facility-admins', teamController.getFacilityAdmins);

// GET /api/team/cores - Get Cores team members
router.get('/cores', teamController.getCoresMembers);

// GET /api/team/managers - Get Managers team members
router.get('/managers', teamController.getManagersMembers);

// GET /api/team/deputy-managers - Get Deputy Managers team members
router.get('/deputy-managers', teamController.getDeputyManagersMembers);


// GET /api/team/creatives - Get Creatives team members
router.get('/creatives', teamController.getCreativesMembers);

// GET /api/team/corporate-communication - Get Corporate Communication team members
router.get('/cc', teamController.getCorporateCommunicationMembers);

// GET /api/team/devops - Get DevOps team members
router.get('/devops', teamController.getDevopsMembers);

// GET /api/team/ex-managers - Get Ex-Managers team members
router.get('/ex-managers', teamController.getExManagersMembers);

// GET /api/team/excores - Get Excores team members
router.get('/excores', teamController.getExcoresMembers);

// GET /api/team/technical-executive - Get Technical Executive team members
router.get('/technical-executive', teamController.getTechnicalExecutive);

// GET /api/team/facility-executive - Get Facility Executive team members
router.get('/facility-executive', teamController.getFacilityExecutive);

// GET /api/team/external-affairs-executive - Get External Affairs Executive team members
router.get('/external-affairs-executive', teamController.getExternalAffairsExecutive);

// GET /api/team/internal-affairs-executive - Get Internal Affairs Executive team members
router.get('/internal-affairs-executive', teamController.getInternalAffairsExecutive);

// GET /api/team/all - Get all team members
router.get('/all', teamController.getAllTeamMembers);

// GET /api/team/:id - Get single team member by ID
router.get('/:id', teamController.getTeamMemberById);

module.exports = router;