const express = require('express');
const router = express.Router();
const { getAllInventory } = require('../controllers/inventoryController');

// GET all inventory items
router.get('/', getAllInventory);



module.exports = router;
