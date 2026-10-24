const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');
const { sendContactEmail } = require('../utils/sendEmail');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At most RATE_LIMIT messages per IP per RATE_WINDOW_MS (kept in memory per
// server instance; enough to stop casual form spam)
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const recentByIp = new Map();

const clientIp = (req) => (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (recentByIp.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    recentByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  return false;
};

// POST /api/contact (public): save the message, then email it to the SCIEnT inbox
const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body || {};

    // Honeypot: the form's hidden "website" field is only filled in by bots.
    // Answer as if it worked so they don't retry.
    if (website) return res.status(201).json({ success: true });

    const clean = {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      subject: String(subject || '').trim(),
      message: String(message || '').trim(),
    };
    if (!clean.name || !clean.message) {
      return res.status(400).json({ success: false, message: 'Please enter your name and a message.' });
    }
    if (!EMAIL_RE.test(clean.email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address so we can reply.' });
    }
    if (clean.name.length > 100 || clean.subject.length > 200 || clean.message.length > 5000) {
      return res.status(400).json({ success: false, message: 'Your message is too long. Please shorten it.' });
    }
    if (isRateLimited(clientIp(req))) {
      return res.status(429).json({ success: false, message: 'Too many messages from your network. Please try again later.' });
    }

    const saved = await ContactMessage.create(clean);
    try {
      if (await sendContactEmail(clean)) {
        saved.emailed = true;
        await saved.save();
      }
    } catch (err) {
      // The message is saved and visible in the admin portal either way
      console.error('[Contact] Email notification failed:', err.message);
    }
    res.status(201).json({ success: true, message: 'Thanks! Your message has been sent.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not send your message. Please try again later.' });
  }
};

// GET /api/contact (admin): newest first
const listMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(500);
    res.json({ success: true, data: messages, unread: messages.filter(m => !m.read).length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// GET /api/contact/unread-count (admin): for the badge on the admin tabs
const unreadCount = async (req, res) => {
  try {
    res.json({ success: true, data: await ContactMessage.countDocuments({ read: false }) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// PATCH /api/contact/:id (admin): { read: true|false }
const setRead = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: 'Message not found' });
    const updated = await ContactMessage.findByIdAndUpdate(req.params.id, { read: !!req.body?.read }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// DELETE /api/contact/:id (admin)
const deleteMessage = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: 'Message not found' });
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { submitMessage, listMessages, unreadCount, setRead, deleteMessage };
