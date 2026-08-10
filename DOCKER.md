# Local stack with Docker Compose

Runs the whole booking flow — MySQL, the Express API and the frontend — with no
host MySQL/MariaDB and no `sudo`. The database container creates the database,
the app user and the schema itself on first start.

## Prerequisites

Docker with the Compose plugin. Only `.env` is needed; it must contain at least:

```
DB_NAME=mingrowspace
DB_USER=mingrowspace
DB_PASSWORD=<your password>
RAZORPAY_KEY_ID=<key id>
RAZORPAY_KEY_SECRET=<key secret>
RAZORPAY_WEBHOOK_SECRET=<webhook secret>
ADMIN_SECRET_KEY=<admin key>
```

`DB_HOST`, `DB_PORT` and `DB_SSL` in `.env` are ignored inside Docker — Compose
overrides them to reach the `db` service directly.

## Run it

```bash
docker compose up -d --build
```

The app is then on <http://localhost:3111> (Express serves the built frontend,
so `/studio` and `/api/*` share one origin and no proxy is involved).

With hot reload instead:

```bash
docker compose --profile dev up -d
```

That adds Vite on <http://localhost:5173> with `src/`, `public/`,
`index.html` and `vite.config.js` live-mounted. `/api` is proxied to the `api`
container via `VITE_API_PROXY_TARGET`.

## Everyday commands

```bash
docker compose logs -f api          # API logs
docker compose restart api          # after editing api/ or server.js
docker compose down                 # stop (database volume is kept)
docker compose down -v              # stop and DELETE all booking data
```

`api/` and `server.js` are baked into the image, so rebuild after changing them:

```bash
docker compose up -d --build api
```

## Database access

```bash
docker compose exec db mysql -umingrowspace -p mingrowspace
```

Also exposed on `127.0.0.1:3307` for GUI clients — port **3307**, not 3306, to
avoid clashing with a host MySQL/MariaDB.

## Re-running the schema

`database/mysql_migration.sql` is mounted into
`/docker-entrypoint-initdb.d/`, which MySQL executes **only when the data
directory is empty**. Editing the file later has no effect on an existing
volume. To re-seed from scratch (destroys all booking data):

```bash
docker compose down -v && docker compose up -d --build
```

Or apply a change by hand:

```bash
docker compose exec -T db mysql -umingrowspace -p mingrowspace < database/mysql_migration.sql
```

## Notes

- The image is credential-free: `.env` is in `.dockerignore` and injected at
  runtime via `env_file`. Nothing in `src/` reads `import.meta.env`, so no
  secrets are needed at build time — the browser receives the Razorpay key id
  from `/api/payments/create-order`.
- `VITE_RAZORPAY_KEY_ID` in `.env` is currently unused for the same reason.
- The Razorpay webhook needs a public URL, so it cannot reach `localhost`. Use a
  tunnel (e.g. `cloudflared`, `ngrok`) pointing at port 3111 and set that URL in
  the Razorpay dashboard if you need to test webhooks.
