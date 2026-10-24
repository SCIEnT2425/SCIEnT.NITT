#!/usr/bin/env bash
# deploy_script.sh – one-command deploy (first time and updates) for the SCIEnT website.
#
#   bash deploy_script.sh
#
# Run it on a Linux server from inside this folder. It asks for the sudo
# password when it needs administrator rights, installs Docker if missing,
# starts and seeds the database, builds and starts the site, and prints the
# address it is reachable at.
#
# Stack (all in Docker; nothing else is installed on the host):
#   db        MongoDB, data in the scient_db-data volume   docker-compose.yml
#   frontend  React (CRA) build served by nginx            docker-compose.yml
#   backend   Express API, Node 22                         docker-compose.yml
#   nginx     public reverse proxy, port 4020              nginx/compose.yaml
# MongoDB Atlas is not used: the college network blocks it, so the database runs
# locally. Each deploy seeds only empty collections, so admin-portal edits stay.

set -euo pipefail

# ── Settings ──────────────────────────────────────────────────────────────────
export PUBLIC_PORT="${PUBLIC_PORT:-4020}"    # public site port, published by nginx/compose.yaml
NETWORK="scient-network"
DB_WAIT_SECONDS=120
APP_WAIT_SECONDS=120

DO_BUILD=true
ORIG_ARGS=("$@")

# ── Output helpers ────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  C_INFO='\033[0;36m' C_OK='\033[0;32m' C_WARN='\033[0;33m' C_ERR='\033[0;31m' C_OFF='\033[0m'
else
  C_INFO='' C_OK='' C_WARN='' C_ERR='' C_OFF=''
fi
info() { echo -e "${C_INFO}[INFO]${C_OFF} $*"; }
ok()   { echo -e "${C_OK}[ OK ]${C_OFF} $*"; }
warn() { echo -e "${C_WARN}[WARN]${C_OFF} $*" >&2; }
die()  { echo -e "${C_ERR}[FAIL]${C_OFF} $*" >&2; exit 1; }
step() { echo; echo -e "${C_INFO}==>${C_OFF} $*"; }

on_error() {
  local code=$? line=$1
  echo -e "${C_ERR}[FAIL]${C_OFF} deploy_script.sh stopped at line ${line} (exit ${code})." >&2
  echo "       Inspect with: sudo docker compose ps && sudo docker compose logs --tail=50" >&2
}
trap 'on_error $LINENO' ERR

usage() {
  cat <<'EOF'
Usage: bash deploy_script.sh [options]

  --no-build          Restart with the existing images instead of rebuilding.
  -h, --help          Show this help.

Environment: PUBLIC_PORT=<port> serves the site on another port (default 4020).

The database is seeded automatically: each collection (team, clubs, projects,
tools, admins) is filled only while it is empty. To start over from the seed
data, run:  sudo docker compose down -v   (deletes all site data), then deploy.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-build) DO_BUILD=false ;;
    -h|--help) usage; exit 0 ;;
    *) usage; die "Unknown option: $1" ;;
  esac
  shift
done

SCRIPT_PATH="$(readlink -f "$0")"
cd "$(dirname "$SCRIPT_PATH")"
APP_DIR="$(pwd)"

compose() { docker compose "$@"; }

# Read KEY from an env file without sourcing it (values may contain spaces/quotes)
env_get() {
  local file=$1 key=$2 line val
  line=$(grep -E "^[[:space:]]*${key}[[:space:]]*=" "$file" | tail -n 1 || true)
  val=${line#*=}
  val=${val#"${val%%[![:space:]]*}"}
  val=${val%"${val##*[![:space:]]}"}
  val=${val#\"}; val=${val%\"}
  val=${val#\'}; val=${val%\'}
  printf '%s' "$val"
}

# Append KEY=VALUE to an env file, starting on a new line
env_append() {
  local file=$1 key=$2 val=$3
  if [[ -s "$file" && -n "$(tail -c 1 "$file")" ]]; then echo >> "$file"; fi
  echo "${key}=${val}" >> "$file"
}

is_placeholder() {
  [[ -z "$1" || "$1" == your_* || "$1" == change_me* || "$1" == *'\n...\n'* ]]
}

server_ip() { hostname -I 2>/dev/null | awk '{print $1}' || true; }

# ── 0. Administrator rights ───────────────────────────────────────────────────
# Re-run under sudo when installing packages or using Docker needs root
if (( EUID != 0 )); then
  if ! command -v curl >/dev/null 2>&1 || ! command -v docker >/dev/null 2>&1 \
     || ! docker info >/dev/null 2>&1; then
    command -v sudo >/dev/null 2>&1 || die "Administrator rights are needed. Log in as root and run: bash ${SCRIPT_PATH}"
    info "Administrator rights are needed; sudo may ask for your password."
    exec sudo PUBLIC_PORT="$PUBLIC_PORT" bash "$SCRIPT_PATH" ${ORIG_ARGS[@]+"${ORIG_ARGS[@]}"}
  fi
fi

# ── 1. Host prerequisites ─────────────────────────────────────────────────────
step "Checking host prerequisites"
info "App directory: ${APP_DIR}"

for f in docker-compose.yml Dockerfile server/Dockerfile nginx/compose.yaml nginx/nginx.conf \
         package.json package-lock.json server/package.json server/package-lock.json \
         server/scripts/seedLocalDb.js server/data/devSeed/clubs.json; do
  [[ -f "$f" ]] || die "Missing ${f}. Copy the complete scient folder to the server and run the script from inside it."
done
if [[ -d node_modules || -d server/node_modules ]]; then
  warn "node_modules/ was uploaded. It is not used (Docker installs dependencies) and can be deleted."
fi

if ! command -v curl >/dev/null 2>&1; then
  info "Installing curl..."
  if command -v apt-get >/dev/null 2>&1; then apt-get update -qq && apt-get install -y -qq curl
  elif command -v dnf >/dev/null 2>&1; then dnf install -y -q curl
  elif command -v yum >/dev/null 2>&1; then yum install -y -q curl
  else die "curl is missing and no supported package manager (apt, dnf, yum) was found. Install curl, then run this script again."
  fi
fi

# Fresh server: install Docker Engine + Compose plugin with Docker's official script
if ! command -v docker >/dev/null 2>&1; then
  info "Docker not found; installing it from get.docker.com (takes a few minutes)..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
fi
if ! docker info >/dev/null 2>&1 && (( EUID == 0 )); then
  systemctl start docker 2>/dev/null || true
fi
docker compose version >/dev/null 2>&1 || die "Docker Compose v2 plugin is missing (the 'docker compose' command). Install docker-compose-plugin, then run this script again."
docker info >/dev/null 2>&1 || die "Docker is installed but not running. Start it with: sudo systemctl start docker"
ok "Docker $(docker version --format '{{.Server.Version}}'), $(docker compose version --short 2>/dev/null || echo 'compose v2')"

# ── 2. Environment files ──────────────────────────────────────────────────────
step "Validating server/.env"

[[ -f server/.env ]] || die "server/.env not found. Create it: cp server/.env.example server/.env, then fill in the values."

# docker compose rejects a quoted value that is not closed on the same line
bad_lines=$(awk '/^[A-Za-z_][A-Za-z0-9_]*="/ { v=$0; sub(/^[^=]*=/, "", v); if (v !~ /^".*"[[:space:]]*$/) print NR }' server/.env)
[[ -z "$bad_lines" ]] || die "server/.env has an unclosed double quote on line(s): $(echo $bad_lines). Keep each value on one line; write key newlines as \\n inside the quotes."

missing=()

# Required by the backend: admin login, image uploads (Cloudinary + Firebase)
REQUIRED_SERVER_KEYS=(
  JWT_SECRET
  CLOUD_NAME CLOUD_API_KEY CLOUD_API_SECRET
  FIREBASE_PROJECT_ID FIREBASE_CLIENT_EMAIL FIREBASE_PRIVATE_KEY FIREBASE_STORAGE_BUCKET
)
# Optional: features degrade without them but the app still runs
OPTIONAL_SERVER_KEYS=(
  "RESEND_API_KEY|admin password-reset OTP emails are not sent"
  "RESEND_FROM_EMAIL|OTP emails use the default sender"
  "CLIENT_EMAIL|Inventive/Contrive form submissions to Google Sheets fail"
  "PRIVATE_KEY|Inventive/Contrive form submissions to Google Sheets fail"
)

for key in "${REQUIRED_SERVER_KEYS[@]}"; do
  if is_placeholder "$(env_get server/.env "$key")"; then missing+=("server/.env: ${key}"); fi
done
if (( ${#missing[@]} > 0 )); then
  printf '       - %s\n' "${missing[@]}" >&2
  die "Required environment values are missing or still placeholders (listed above)."
fi

for entry in "${OPTIONAL_SERVER_KEYS[@]}"; do
  key=${entry%%|*}
  if is_placeholder "$(env_get server/.env "$key")"; then warn "server/.env: ${key} not set; ${entry#*|}."; fi
done

jwt=$(env_get server/.env JWT_SECRET)
if (( ${#jwt} < 32 )); then warn "JWT_SECRET is shorter than 32 characters. Generate one with: openssl rand -hex 32"; fi

# First admin account for the admin portal; created by the seed only while
# there are no admins. Generate a password once and keep it in server/.env.
admin_user=$(env_get server/.env ADMIN_USERNAME)
if [[ -z "$admin_user" ]]; then
  admin_user=admin
  env_append server/.env ADMIN_USERNAME "$admin_user"
fi
admin_pass=$(env_get server/.env ADMIN_PASSWORD)
if [[ -z "$admin_pass" ]]; then
  admin_pass=$(head -c 64 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | cut -c 1-16)
  env_append server/.env ADMIN_PASSWORD "$admin_pass"
  info "Generated an admin password and saved it to server/.env (ADMIN_PASSWORD)."
elif (( ${#admin_pass} < 6 )); then
  die "server/.env: ADMIN_PASSWORD must be at least 6 characters."
fi

chmod 600 server/.env
ok "server/.env is complete; permissions set to 600"
if [[ -n "$(env_get server/.env MONGO_URI)$(env_get server/.env MONGO_URI_ATLAS)" ]]; then
  info "The Atlas URI in server/.env is ignored; the backend uses the local db container."
fi

# MongoDB 5+ needs a CPU with AVX; older servers get MongoDB 4.4. The choice is
# saved in ./.env (read by docker compose) so the data volume always gets the
# same version.
mongo_image=$( [[ -f .env ]] && env_get .env MONGO_IMAGE || true )
if [[ -z "$mongo_image" ]]; then
  if [[ "$(uname -m)" == x86_64 ]] && ! grep -qw avx /proc/cpuinfo; then
    mongo_image=mongo:4.4
    warn "This CPU has no AVX support; using MongoDB 4.4 instead of 7.0."
  else
    mongo_image=mongo:7.0
  fi
  env_append .env MONGO_IMAGE "$mongo_image"
fi
info "Database image: ${mongo_image}"

# ── 3. Docker network ─────────────────────────────────────────────────────────
step "Preparing Docker network"
if docker network inspect "$NETWORK" >/dev/null 2>&1; then
  ok "Network ${NETWORK} exists"
else
  docker network create "$NETWORK" >/dev/null
  ok "Created network ${NETWORK}"
fi

compose config -q || die "docker-compose.yml failed validation (see above)."

# ── 4. Install dependencies and build ─────────────────────────────────────────
if [[ "$DO_BUILD" == true ]]; then
  step "Building images (npm ci + React production build run inside Docker; first run takes several minutes)"
  compose build --pull
  ok "Images built"
else
  info "Skipping build (--no-build)"
fi

# ── 5. Database ───────────────────────────────────────────────────────────────
step "Starting the database (MongoDB container)"
compose up -d db
db_id=$(compose ps -q db)
[[ -n "$db_id" ]] || die "db container did not start."

deadline=$((SECONDS + DB_WAIT_SECONDS))
db_state=""
while (( SECONDS < deadline )); do
  db_state=$(docker inspect -f '{{.State.Status}}/{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$db_id")
  [[ "$db_state" == running/healthy ]] && break
  sleep 3
done
if [[ "$db_state" != running/healthy ]]; then
  compose logs --tail=40 db >&2
  die "MongoDB did not become healthy (state: ${db_state}). If the log mentions an illegal instruction or AVX, set MONGO_IMAGE=mongo:4.4 in ./.env, run: sudo docker compose down -v, then deploy again."
fi
ok "MongoDB is up (data volume: scient_db-data)"

step "Seeding the database (only empty collections)"
# public/Team is mounted so team members without a photo link get the bundled photo
if ! seed_out=$(compose run --rm --no-deps -T -v "${APP_DIR}/public/Team:/public/Team:ro" \
                backend node scripts/seedLocalDb.js 2>&1); then
  echo "$seed_out" >&2
  die "Seeding failed (output above)."
fi
echo "$seed_out" | grep -E '^\[(seed|dev seed)\]' || true
admin_created=false
if grep -q 'admin account created' <<<"$seed_out"; then admin_created=true; fi
ok "Database seeded"
info "Migrations: none. Mongoose creates collections and indexes when the backend starts."

# ── 6. Application ────────────────────────────────────────────────────────────
step "Starting backend and frontend"
compose up -d --remove-orphans
# A container that exits on startup shows as "Started" above; make sure each one
# stayed up, otherwise the nginx proxy fails later with "host not found in upstream"
sleep 5
for svc in backend frontend; do
  svc_id=$(compose ps -aq "$svc")
  svc_state=$(docker inspect -f '{{.State.Status}}/{{.RestartCount}}' "$svc_id")
  if [[ "$svc_state" != running/0 ]]; then
    compose logs --tail=40 "$svc" >&2
    die "The ${svc} container keeps stopping (state/restarts: ${svc_state}); its log is above."
  fi
done
ok "Application containers started"

step "Starting public nginx proxy (port ${PUBLIC_PORT})"
# Earlier versions ran this proxy under the folder-derived project name "nginx";
# remove that container so it doesn't keep holding the port
legacy_nginx=$(docker ps -aq --filter label=com.docker.compose.project=nginx \
                 --filter "label=com.docker.compose.project.working_dir=${APP_DIR}/nginx")
if [[ -n "$legacy_nginx" ]]; then
  docker rm -f $legacy_nginx >/dev/null
  info "Removed the old nginx proxy container (the proxy is now compose project scient-nginx)"
fi
docker compose -f nginx/compose.yaml up -d
nginx_id=$(docker compose -f nginx/compose.yaml ps -q nginx)
[[ -n "$nginx_id" ]] || die "nginx container did not start."
# nginx exits right after starting on a bad config, an unreadable nginx.conf or an
# unresolvable upstream, and docker exec fails on a restarting container; check
# that it stayed up first so the real error is shown
sleep 3
nginx_state=$(docker inspect -f '{{.State.Status}}/{{.RestartCount}}' "$nginx_id")
if [[ "$nginx_state" != running/0 ]]; then
  docker logs --tail=30 "$nginx_id" >&2 || true
  die "The nginx proxy container keeps stopping (state/restarts: ${nginx_state}); its log is above."
fi
if ! docker exec "$nginx_id" nginx -t >/dev/null 2>&1; then
  docker exec "$nginx_id" nginx -t || true
  die "nginx/nginx.conf is invalid (nginx -t output above)."
fi
docker exec "$nginx_id" nginx -s reload >/dev/null
ok "nginx config valid and reloaded"

# ── 7. Verification ───────────────────────────────────────────────────────────
step "Verifying the deployment"
base="http://127.0.0.1:${PUBLIC_PORT}"
deadline=$((SECONDS + APP_WAIT_SECONDS))
frontend_ok=false
api_ok=false
while (( SECONDS < deadline )); do
  if [[ "$frontend_ok" != true ]] && curl -fsS -o /dev/null "${base}/" 2>/dev/null; then frontend_ok=true; fi
  if [[ "$api_ok" != true ]] && curl -fsS -o /dev/null "${base}/api/clubs" 2>/dev/null; then api_ok=true; fi
  if [[ "$frontend_ok" == true && "$api_ok" == true ]]; then break; fi
  sleep 3
done

[[ "$frontend_ok" == true ]] || { compose logs --tail=40 frontend >&2; die "Frontend did not respond at ${base}/"; }
ok "Frontend responds at ${base}/"
# The backend only listens after it has connected to the database
[[ "$api_ok" == true ]] || { compose logs --tail=60 backend >&2; die "API did not respond at ${base}/api/clubs (backend log above)."; }
ok "API responds at ${base}/api/clubs (connected to the db container)"

# ── Summary ───────────────────────────────────────────────────────────────────
step "Deployment status"
compose ps
docker compose -f nginx/compose.yaml ps
ip=$(server_ip)
echo
ok "SCIEnT is live."
info "Open:  http://${ip:-SERVER_IP}:${PUBLIC_PORT}/   (on this server: ${base}/)"
if [[ "$admin_created" == true ]]; then
  info "Admin portal login created:  username ${admin_user}   password ${admin_pass}   (also in server/.env)"
fi
info "If it does not open from another computer, allow TCP port ${PUBLIC_PORT} in the server's firewall."
info "Update later: replace the files (keep server/.env and .env) and run bash deploy_script.sh again; the database is kept."
info "Back up the database: sudo docker compose exec -T db sh -c 'mongodump --archive --gzip --db scient' > scient-db.archive.gz"
info "Logs: sudo docker compose logs -f backend    Stop: sudo docker compose down && sudo docker compose -f nginx/compose.yaml down"
