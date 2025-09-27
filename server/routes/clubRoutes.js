// routes/clubRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { getCredits,getAvailableSlots,getClubsData, getClub } = require('../controllers/clubController');
const router = express.Router();

router.get('/credits', protect, getCredits); 
router.get('/slots/available', protect, getAvailableSlots);
router.get('/clubdata',protect,getClubsData);
router.get('/:name/projects',getClub);

module.exports = router;
