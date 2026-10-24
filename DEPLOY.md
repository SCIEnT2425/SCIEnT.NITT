# Deploying SCIEnT on the college server

Everything runs in Docker on the server: `db` (MongoDB), `backend` (Express API), `frontend` (React build served by nginx), and `nginx` (public reverse proxy on port 4020). MongoDB Atlas is not used because the college network blocks it. The database runs in its own container and its data lives in the Docker volume `scient_db-data`.

## Deploy (first time and every update)

1. Copy this whole `scient` folder to the server, by FTP or `scp`, including `server/.env`. FTP clients often hide dotfiles, so check that `server/.env` arrived. You don't need to upload `node_modules/` or `build/`.
2. On the server, run:

   ```bash
   cd ~/scient
   bash deploy_script.sh
   ```

The script asks for the sudo password if it needs it, then:

1. Installs Docker if it's missing.
2. Checks `server/.env`.
3. Builds the images (`npm ci` and the React build run inside Docker).
4. Starts MongoDB and seeds it.
5. Starts the site.
6. Checks that `/` and `/api/clubs` respond.

At the end it prints the address, for example `http://SERVER_IP:4020/`. If anything goes wrong, it stops with a red `[FAIL]` line explaining what to fix.

To use another port, run `PUBLIC_PORT=8080 bash deploy_script.sh`. `bash deploy_script.sh --help` lists the options.

## Database and seeding

On every deploy, `server/scripts/seedLocalDb.js` fills each collection only while it is empty:

| Collection | Source |
|---|---|
| team members | `server/scripts/seedTeamMembers.js` (photos from Firebase, or `public/Team/`) |
| clubs, projects, tools | `server/data/devSeed/` and the BPCL list in `server/scripts/seedBpclTools.js` |
| admin account | `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `server/.env` |

If `ADMIN_PASSWORD` is missing, the first deploy generates one, saves it in `server/.env` and prints the login once.

Data changed through the admin portal is never overwritten. To throw the data away and reseed from scratch:

```bash
sudo docker compose down -v      # deletes ALL site data
bash deploy_script.sh
```

There are no migrations, because Mongoose creates collections and indexes on startup.

## Updating

Upload the new files over the old ones, keeping the server's `server/.env` (it holds the admin password) and `./.env` (the MongoDB version picked for this CPU). Then run `bash deploy_script.sh` again. The database volume is kept.

## Backups

```bash
# Back up
sudo docker compose exec -T db sh -c 'mongodump --archive --gzip --db scient' > scient-db.archive.gz

# Restore (replaces the current data)
sudo docker compose exec -T db sh -c 'mongorestore --archive --gzip --drop' < scient-db.archive.gz
```

On MongoDB 4.4, use the same commands. The database port is not published outside Docker.

## Notes

- **Old CPUs.** MongoDB 7 needs a CPU with AVX. On servers without it, the script picks MongoDB 4.4 and records that in `./.env`.
- **Internet access.** The server still needs internet access for Docker Hub and npm during the build. It also needs Cloudinary, Firebase and Resend for image uploads and emails, but not for Atlas.
- **Logs and stopping.** View logs with `sudo docker compose logs -f backend`. Stop the site with `sudo docker compose down && sudo docker compose -f nginx/compose.yaml down`.
