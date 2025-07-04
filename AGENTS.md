# Repository Guide for Agents

This repository hosts **the last pokerbender**, a LAN-only planning poker tool implemented in TypeScript. The backend uses NestJS while the client is a React Native (Expo) app. PostgreSQL and Redis are started through Docker Compose.

## Directory Overview

- `backend/` – NestJS API source and Dockerfile
- `client/` – React Native client code and Dockerfile
- `db/` – SQL initialization scripts
- `scripts/` – helper scripts used by CI (e.g. `test_health.sh`)
- `docker-compose.yml` – brings up all services for local development

## Development

1. Use **Node 20** (see Dockerfiles) and TypeScript throughout.
2. Install dependencies with `npm install` in the respective `backend` or `client` folder.
3. Build the backend with `npm run build`. The Docker image runs this command during build as well.
4. Launch the full stack locally via:
   ```bash
   docker compose up --build
   ```
   This starts the API on port `4000` and the client on `19006`.

## Testing

- CI uses `scripts/test_health.sh` to check the `/health` endpoint. When services are running (e.g. via Docker Compose), you can run the script manually:
  ```bash
  ./scripts/test_health.sh
  ```
- There are currently no unit tests, but ensure `npm run build` succeeds before committing.

## Contribution Guidelines

- Follow **Conventional Commits** for commit messages.
- Keep coding style consistent (ESLint/Prettier are expected but not yet configured).
- Avoid committing generated files such as `node_modules/` or lock files.
- Database schema changes should be added to `db/init` SQL scripts.
- When implementing card features, remember to log actions to the `card_logs` table as done in the current service.

## Database Notes

- PostgreSQL is seeded using the scripts in `db/init` when the database container starts.
- Tables currently include `users`, `cards`, and `card_logs`.

Use this document as a quick reference when adding features or running the project locally.
