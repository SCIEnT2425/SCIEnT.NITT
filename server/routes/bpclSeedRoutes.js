/**
 * POST /api/inventory/seed-bpcl
 * ─────────────────────────────────────────────────────────────────────────────
 * Protected admin endpoint that syncs the BPCL-sponsored tools: inserts any
 * that are missing and replaces old placeholder photos with the real ones.
 * The tool list and logic live in scripts/seedBpclTools.js.
 *
 * Idempotent. Requires valid admin JWT (Authorization: Bearer <token>).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { syncBpclTools } = require('../scripts/seedBpclTools');

router.post('/seed-bpcl', protect, async (req, res) => {
  try {
    const results = await syncBpclTools();
    res.status(200).json({
      message: `BPCL sync complete. Inserted: ${results.inserted}, Photos updated: ${results.updated}, Unchanged: ${results.unchanged}`,
      ...results,
    });
  } catch (err) {
    res.status(500).json({ message: 'BPCL sync failed', error: err.message });
  }
});

module.exports = router;
