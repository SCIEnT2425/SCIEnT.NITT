/**
 * resizeTeamPhotos.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Shrinks team photos that were uploaded at full camera size (5-8 MB each)
 * before uploads were resized. For every member photo on Firebase Storage over
 * 400 KB it makes an 800 x 1000 JPEG (same as utils/teamPhotos.js does for new
 * uploads).
 *
 *   node scripts/resizeTeamPhotos.js          dry run: reports sizes, changes nothing
 *   node scripts/resizeTeamPhotos.js --apply  uploads the resized copies to
 *       Team/team-members/<year|admin>/resized/ and points the members to them.
 *       The originals stay in Storage. Writes the old URL -> new URL map to
 *       resized-photo-urls.json (or --out=<file>) so seedTeamMembers.js can be
 *       updated to match. In the Docker image, pass --out=/tmp/... and copy it out.
 *
 * Re-running is safe: photos already resized are under 400 KB and skipped.
 *
 * Run from the server/ directory; uses the same database as the backend.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const TeamMember = require('../models/TeamMember');
const { resizeTeamPhoto, uploadTeamPhoto } = require('../utils/teamPhotos');

const APPLY = process.argv.includes('--apply');
// Where --apply writes the old -> new URL map (the Docker image's /app is read-only for its user)
const OUT_FILE = (process.argv.find(a => a.startsWith('--out=')) || '--out=resized-photo-urls.json').slice('--out='.length);
const MIN_BYTES = 400 * 1024;
const isFirebaseUrl = url => /firebasestorage\.googleapis\.com|storage\.googleapis\.com/.test(url || '');
const kb = bytes => `${Math.round(bytes / 1024)} KB`;

async function main() {
  const bucket = APPLY ? require('../config/firebaseConfig').getBucket() : null;
  if (APPLY && !bucket) throw new Error('Firebase is not configured (FIREBASE_* in server/.env)');

  await mongoose.connect(process.env.MONGO_URI_ATLAS || process.env.MONGO_URI);
  const members = await TeamMember.find({ photoUrl: { $regex: 'googleapis' } }, 'name year photoUrl');

  // Several records (the same person in two years) can share one photo
  const byUrl = new Map();
  members.filter(m => isFirebaseUrl(m.photoUrl)).forEach(m => {
    if (!byUrl.has(m.photoUrl)) byUrl.set(m.photoUrl, []);
    byUrl.get(m.photoUrl).push(m);
  });

  const replaced = {};
  let before = 0, after = 0, skipped = 0, failed = 0;
  for (const [url, owners] of byUrl) {
    const label = owners[0].name;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const original = Buffer.from(await res.arrayBuffer());
      if (original.length <= MIN_BYTES) { skipped++; continue; }

      const resized = await resizeTeamPhoto(original);
      before += original.length; after += resized.length;
      console.log(`${label.padEnd(36)} ${kb(original.length).padStart(8)} -> ${kb(resized.length)}`);

      if (APPLY) {
        const destPath = `Team/team-members/${owners[0].year || 'admin'}/resized/${owners[0]._id}.jpg`;
        const newUrl = await uploadTeamPhoto(bucket, destPath, resized);
        await TeamMember.updateMany({ photoUrl: url }, { $set: { photoUrl: newUrl } });
        replaced[url] = newUrl;
      }
    } catch (err) {
      failed++;
      console.error(`FAILED ${label}: ${err.message}`);
    }
  }

  if (APPLY) {
    fs.writeFileSync(OUT_FILE, JSON.stringify(replaced, null, 2));
  }
  console.log('-----------------------------------------');
  console.log(`Photos resized : ${Object.keys(replaced).length || (byUrl.size - skipped - failed)}${APPLY ? '' : ' (dry run, nothing changed)'}`);
  console.log(`Already small  : ${skipped}`);
  console.log(`Failed         : ${failed}`);
  console.log(`Total size     : ${kb(before)} -> ${kb(after)}`);
  if (APPLY) console.log(`Old -> new URLs written to ${OUT_FILE}`);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
