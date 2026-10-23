/**
 * cloudRunEnv.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Writes server/cloudrun.env.yaml from server/.env for
 *   gcloud run deploy ... --env-vars-file server/cloudrun.env.yaml
 *
 * Leaves out PORT (Cloud Run sets it) and the frontend-only settings, and forces
 * NODE_ENV=production. The output holds secrets: it is gitignored and in
 * .gcloudignore, so never commit or upload it anywhere else.
 *
 * Run from server/:  node scripts/cloudRunEnv.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const SKIP = new Set(['PORT', 'REACT_APP_API_URL', 'BACKEND_URL', 'ENV_MODE', 'MONGO_URI_LOCAL']);

const envPath = path.join(__dirname, '../.env');
const outPath = path.join(__dirname, '../cloudrun.env.yaml');
const env = dotenv.parse(fs.readFileSync(envPath));

if (!env.MONGO_URI && !env.MONGO_URI_ATLAS) {
  console.error('server/.env has no MONGO_URI (or MONGO_URI_ATLAS); Cloud Run needs the Atlas connection string.');
  process.exit(1);
}

const vars = { ...env, NODE_ENV: 'production' };
const lines = Object.entries(vars)
  .filter(([key, value]) => !SKIP.has(key) && value !== '')
  // JSON strings are valid YAML double-quoted scalars, so quoting and escapes are safe
  .map(([key, value]) => `${key}: ${JSON.stringify(String(value))}`);

fs.writeFileSync(outPath, lines.join('\n') + '\n', { mode: 0o600 });
console.log(`Wrote ${path.relative(process.cwd(), outPath)} with ${lines.length} variables:`);
console.log('  ' + Object.keys(vars).filter(k => !SKIP.has(k) && vars[k] !== '').join(', '));
