const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// GET all inventory items
router.get('/', inventoryController.getAllInventory);



module.exports = router;
