const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/contact - Contact Us form (public)
router.post('/', contactController.submitMessage);

// GET /api/contact - All messages, newest first (Admin only)
router.get('/', protect, adminOnly, contactController.listMessages);

// GET /api/contact/unread-count - For the admin tab badge (Admin only)
router.get('/unread-count', protect, adminOnly, contactController.unreadCount);

// PATCH /api/contact/:id - Mark read / unread (Admin only)
router.patch('/:id', protect, adminOnly, contactController.setRead);

// DELETE /api/contact/:id - Delete a message (Admin only)
router.delete('/:id', protect, adminOnly, contactController.deleteMessage);

module.exports = router;
