/**
 * seedLocalDb.js
 *
 * Seeds the MongoDB container used on the college server (see docker-compose.yml).
 * deploy_script.sh runs it on every deploy, inside a throwaway backend container:
 *   - site data (team, clubs, projects, tools) via seedDevData.js
 *   - the first admin account, from ADMIN_USERNAME / ADMIN_PASSWORD in server/.env
 *
 * Everything is seeded only when its collection is empty, so it never
 * overwrites data edited through the admin portal.
 *
 * Run manually (from the project root on the server):
 *   docker compose run --rm backend node scripts/seedLocalDb.js
 */
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const { seedDevData } = require('./seedDevData');

async function seedAdmin() {
  if (await Admin.estimatedDocumentCount() > 0) return;

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 6) {
    throw new Error('ADMIN_PASSWORD (at least 6 characters) must be set in server/.env to create the first admin');
  }

  await Admin.create({ username, password, email: process.env.ADMIN_EMAIL || undefined });
  console.log(`[seed] admin account created: ${username.toLowerCase().trim()}`);
}

async function main() {
  const uri = process.env.MONGO_URI;
  // Only ever seed the local container, never an Atlas cluster left in server/.env
  if (!uri || uri.startsWith('mongodb+srv://')) {
    throw new Error(`refusing to seed ${uri ? 'an Atlas' : 'an unset'} MONGO_URI; expected the db container`);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  console.log(`[seed] connected to ${mongoose.connection.host}/${mongoose.connection.name}`);

  await seedDevData();
  await seedAdmin();

  const counts = await Promise.all(
    ['teammembers', 'clubs', 'projects', 'tools', 'admins'].map(async (c) =>
      `${c}=${await mongoose.connection.db.collection(c).countDocuments()}`)
  );
  console.log(`[seed] done: ${counts.join(' ')}`);
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
