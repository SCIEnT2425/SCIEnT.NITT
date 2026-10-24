#!/usr/bin/env bash
# Builds deploy/scient/ – a self-contained folder to hand to whoever deploys:
# they copy it to a Linux server and run `bash deploy_script.sh` there.
# Contents: tracked files as they are in the working tree (uncommitted edits
# included, untracked files not), minus the paths dropped below, plus a copy
# of server/.env so the folder carries the backend secrets and Atlas URI.
# deploy/ is gitignored, but treat the folder as secret when sharing it.
set -euo pipefail

root="$(git rev-parse --show-toplevel)"
cd "$root"

untracked=$(git ls-files --others --exclude-standard)
if [[ -n "$untracked" ]]; then
  echo "warning: untracked files are NOT included in the bundle (git add them first):" >&2
  sed 's/^/  /' <<<"$untracked" >&2
fi

env_src="$root/server/.env"
if [[ ! -f "$env_src" ]]; then
  echo "error: server/.env not found; create it from server/.env.example first" >&2
  exit 1
fi
# docker compose rejects a quoted value that is not closed on the same line
bad_lines=$(awk '/^[A-Za-z_][A-Za-z0-9_]*="/ { v=$0; sub(/^[^=]*=/, "", v); if (v !~ /^".*"[[:space:]]*$/) print NR }' "$env_src")
if [[ -n "$bad_lines" ]]; then
  echo "error: server/.env has an unclosed double quote on line(s): $(echo $bad_lines)." >&2
  echo "       Keep each value on one line; write key newlines as \\n inside the quotes." >&2
  exit 1
fi

out="$root/deploy/scient"
rm -rf "$out"
mkdir -p "$out"

# Snapshot of the working tree's tracked files; HEAD when there are no changes
tree=$(git stash create)
git archive --format=tar "${tree:-HEAD}" | tar -x -C "$out"

# Drop excluded paths that are tracked (secrets/node_modules are never tracked)
rm -rf "$out/server/data/backup" "$out/BPCL" "$out/.gitignore" "$out/.ftpignore" \
       "$out/scripts/make-deploy-bundle.sh"
rmdir "$out/scripts" 2>/dev/null || true

# Guard: nothing secret should have slipped in from git
if find "$out" \( -name '.env' -o -name '.env.*' ! -name '*.example' -o -name '*serviceAccount*.json' \) | grep -q .; then
  echo "error: secret file found in bundle" >&2
  exit 1
fi
if grep -rqs --exclude='*.example' -e '-----BEGIN PRIVATE KEY-----' "$out"; then
  echo "error: private key found in bundle" >&2
  exit 1
fi

install -m 600 "$env_src" "$out/server/.env"
chmod +x "$out/deploy_script.sh"

cat > "$out/HOW_TO_DEPLOY.txt" <<'EOF'
HOW TO DEPLOY THE SCIEnT WEBSITE
================================

You need: a Linux server (Ubuntu, Debian, Fedora, ...) with internet access,
and a user that can use sudo.

1. Copy this whole "scient" folder to the server, for example:
       scp -r scient  user@SERVER_IP:~/

2. Log in to the server and run:
       cd ~/scient
       bash deploy_script.sh

   Enter your password if it asks. The first run installs Docker and builds
   the site, which takes several minutes.

3. When it prints "SCIEnT is live", open the address it shows
   (http://SERVER_IP:4020/) in a browser.

To update the site later, replace the folder with a new copy and run
"bash deploy_script.sh" again.

If it stops with a red [FAIL] line, that line says what is wrong. The most
common one, "Could not connect to MongoDB Atlas", means the server's IP
(printed in the message) must be added under Network Access in the MongoDB
Atlas console by whoever manages the database.

This folder contains passwords and keys (server/.env). Do not share it publicly.
EOF

echo "Bundle ready: $out ($(du -sh "$out" | cut -f1)), including server/.env"
echo "Share the folder; the recipient follows HOW_TO_DEPLOY.txt (copy to a server, run: bash deploy_script.sh)."
