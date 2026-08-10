# VPS deployment (nginx reverse proxy + GitHub Actions)

Target box: **31.97.233.56**, serving **lp.mingrow.com**.

Shape of it: Docker runs the app on **127.0.0.1:3111** (not publicly bound), and
nginx terminates TLS on 80/443 and proxies to it. Only 22/80/443 are ever open.

```
internet ──> nginx :80/:443 ──> 127.0.0.1:3111 (api container) ──> db container
```

## 1. One-time VPS setup

Install Docker, the Compose plugin, nginx and git, then:

```bash
sudo adduser --disabled-password --gecos "" mingrow
sudo usermod -aG docker mingrow          # lets CI run compose without sudo
sudo mkdir -p /srv/mingrow-studio
sudo chown mingrow:mingrow /srv/mingrow-studio
```

As the `mingrow` user:

```bash
git clone git@github.com:Mingrow-hq/Mingrow-Landing-page.git /srv/mingrow-studio
cd /srv/mingrow-studio
```

Private repo: give the VPS a **read-only deploy key** (`ssh-keygen -t ed25519`,
add the public half under repo → Settings → Deploy keys), otherwise the
`git fetch` in CI fails.

## 2. Create `.env` on the server

`.env` is gitignored and lives only on the box; deploys never overwrite it.

```bash
cat > /srv/mingrow-studio/.env <<'EOF'
DB_NAME=mingrowspace
DB_USER=mingrowspace
DB_PASSWORD=<rotated password>
RAZORPAY_KEY_ID=<key id>
RAZORPAY_KEY_SECRET=<rotated secret>
RAZORPAY_WEBHOOK_SECRET=<rotated webhook secret>
ADMIN_SECRET_KEY=<rotated admin key>
EOF
chmod 600 .env
```

`DB_HOST`/`DB_PORT`/`DB_SSL` are not needed — Compose sets them to reach the
`db` service. The database, user and schema are created by the container on
first start, so there is no MySQL to install and no `sudo mysql` step.

## 3. Start the stack

```bash
cd /srv/mingrow-studio
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
curl -fsS http://127.0.0.1:3111/api/bookings/availability | head -c 80
```

The prod override binds the API to loopback only, unpublishes the DB port
entirely, and sets `NODE_ENV=production` plus `TZ=Asia/Kolkata`.

## 4. nginx + TLS

```bash
sudo cp deploy/nginx-lp.mingrow.com.conf /etc/nginx/sites-available/lp.mingrow.com
sudo ln -s /etc/nginx/sites-available/lp.mingrow.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Point `lp.mingrow.com`'s A record at `31.97.233.56`, then:

```bash
sudo certbot --nginx -d lp.mingrow.com
```

Certbot adds the 443 block and the HTTP redirect. Afterwards remove the bare IP
from `server_name` so the site answers only on the domain.

Firewall:

```bash
sudo ufw allow 22,80,443/tcp && sudo ufw enable
```

Do **not** open 3111 — the prod override already keeps it off the public
interface, and nginx is the only thing that needs to reach it.

## 5. Razorpay webhook

Dashboard → Webhooks → `https://lp.mingrow.com/api/payments/webhook`, using the
same secret as `RAZORPAY_WEBHOOK_SECRET`.

The signature is computed over the **raw** request body. `server.js:26` mounts
`express.raw()` on that path before `express.json()`, and the nginx block avoids
anything that would rewrite the body. Don't add `sub_filter` or request gzip to
that location or verification will start failing.

## 6. GitHub Actions

Two workflows:

- `.github/workflows/ci.yml` — on PRs and pushes: `npm ci`, lint (non-blocking),
  `npm run build`, `node --check` over `server.js` and `api/`, and validation of
  both compose files.
- `.github/workflows/deploy.yml` — on push to `main` (or manual dispatch): SSHes
  in, `git reset --hard origin/main`, rebuilds via compose, prunes old images,
  then polls the health endpoint for up to 30s and tails the API log on failure.

### Secrets to add (repo → Settings → Secrets and variables → Actions)

| Secret | Value |
|---|---|
| `VPS_HOST` | `31.97.233.56` |
| `VPS_USER` | `mingrow` |
| `VPS_SSH_KEY` | private half of a key whose public half is in `mingrow`'s `~/.ssh/authorized_keys` |
| `VPS_KNOWN_HOSTS` | output of `ssh-keyscan -H 31.97.233.56` (optional but recommended — pins the host key instead of trust-on-first-use) |

Optional variable `APP_DIR` if the checkout is not at `/srv/mingrow-studio`.

Generate the deploy keypair (do **not** reuse a personal key):

```bash
ssh-keygen -t ed25519 -f ./vps_deploy -N "" -C "github-actions"
# public half -> VPS:
ssh-copy-id -i ./vps_deploy.pub mingrow@31.97.233.56
# private half -> the VPS_SSH_KEY secret, then delete both local files
```

## Troubleshooting

**`Access denied for user`** — the `db` volume was created with a different
`DB_PASSWORD`. MySQL only reads `MYSQL_PASSWORD` when initialising an empty data
directory, so changing `.env` later has no effect. Either `ALTER USER` inside
the container, or wipe and re-init (**destroys bookings**):
`docker compose down -v && docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`.

**Empty calendar / every date greyed out** — `/api/bookings/availability` is
failing. `docker compose logs --tail 50 api` shows the real cause; the frontend
just renders "nothing available" when that call errors.

**Slots look shifted by hours** — the timezone. Slot filtering compares against
the server clock, so a UTC container drops or keeps the wrong slots for "today".
`TZ` is pinned to `Asia/Kolkata` in the prod override; change it there.

**Running Node directly instead of Docker** — use
`deploy/mingrow-studio.service`, and set `DB_HOST=127.0.0.1` rather than
`localhost`: mysql2 resolves `localhost` to `::1` first, which fails with
`ECONNREFUSED ::1:3306` when MySQL only listens on IPv4.
