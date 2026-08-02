const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');
const { sendOtpEmail } = require('../utils/sendEmail');
const runSeedAll = require('../scripts/seedAll');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.json({
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          role: admin.role,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/forgot-password - Send OTP to admin email
router.post('/forgot-password', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account with this username was not found' });
    }

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    admin.resetOtp = otp;
    admin.resetOtpExpires = otpExpires;
    await admin.save();

    const recipientEmail = admin.email || process.env.EMAIL_USER || 'teamscient.nitt@gmail.com';

    await sendOtpEmail({
      to: recipientEmail,
      otp,
      username: admin.username,
    });

    res.json({
      success: true,
      message: `OTP sent successfully to ${recipientEmail}`,
      email: recipientEmail,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: error.message || 'Failed to process forgot password request' });
  }
});

// POST /api/admin/verify-otp - Verify the 6-digit OTP
router.post('/verify-otp', async (req, res) => {
  const { username, otp } = req.body;
  if (!username || !otp) {
    return res.status(400).json({ message: 'Username and OTP are required' });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    if (!admin.resetOtp || !admin.resetOtpExpires) {
      return res.status(400).json({ message: 'No OTP requested or OTP has expired' });
    }

    if (new Date() > new Date(admin.resetOtpExpires)) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (admin.resetOtp !== otp.trim()) {
      return res.status(400).json({ message: 'Invalid OTP code. Please check and try again.' });
    }

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
});

// POST /api/admin/reset-password - Set new password after OTP verification
router.post('/reset-password', async (req, res) => {
  const { username, otp, newPassword } = req.body;
  if (!username || !otp || !newPassword) {
    return res.status(400).json({ message: 'Username, OTP, and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    if (!admin.resetOtp || !admin.resetOtpExpires) {
      return res.status(400).json({ message: 'No OTP requested or OTP has expired' });
    }

    if (new Date() > new Date(admin.resetOtpExpires)) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    if (admin.resetOtp !== otp.trim()) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    // Set new password (pre-save hook will hash it)
    admin.password = newPassword;
    admin.resetOtp = null;
    admin.resetOtpExpires = null;
    await admin.save();

    res.json({ success: true, message: 'Password reset successfully. You can now login.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
});

// POST /api/admin/seed & GET /api/admin/seed - Run seedAll.js database initialization
const handleSeedRequest = async (req, res) => {
  try {
    const summary = await runSeedAll({ skipConnect: true });
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully!',
      details: summary
    });
  } catch (error) {
    console.error('Seed API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error.message
    });
  }
};

router.post('/seed', handleSeedRequest);
router.get('/seed', handleSeedRequest);

module.exports = router;
