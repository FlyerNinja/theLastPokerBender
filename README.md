# the last pokerbernder – Design Blueprint

## 1. Vision

Create a lightweight, fun Planning Poker tool for internal LAN use, turning feature estimations into elemental cards and capturing rich KPIs for the team.

## 2. Domain Concepts

| Concept   | Meaning                      |
| --------- | ---------------------------- |
| **Fire**  | Wow‑effect feature           |
| **Earth** | Foundation / platform        |
| **Air**   | Proof‑of‑concept / dev spike |
| **Water** | Flow / procedure improvement |

*Element is purely descriptive; Fibonacci weight is independent.*

### Fibonacci Weights

Default set: **1 – 2 – 3 – 5 – 8 – 13 – 21 – 34** (configurable file).

### Card Lifecycle

`unprocessed → [decomposed | accepted | rejected]`

## 3. Functional Requirements

1. **Card submission** from UI (later Slack/API/folder hook).
2. View & filter **All Cards**.
3. Host **Poker Room** sessions (concurrent, LAN‑only).
4. Allow a single user to create multiple voting *participants* (self‑granted aliases).
5. Track every action for KPI dashboards (cycle‑time, dispersion, velocity, element mix).
6. Minimal rules; optional lightweight facilitator role (TBD).

## 4. Non‑Functional Requirements

* **LAN‑only**, zero external dependencies.
* **Docker‑first** for repeatable dev env.
* Near‑real‑time interactions (< 200 ms) via WebSockets.
* Written in **TypeScript** throughout.
* 90 % unit‑test coverage on critical logic.

## 5. System Architecture

| Layer             | Technology                       |
| ----------------- | -------------------------------- |
| **Client**        | React Native (Expo) + TypeScript |
| **Realtime**      | Socket.IO                        |
| **API**           | Node.js (NestJS)                 |
| **DB**            | PostgreSQL (Prisma ORM)          |
| **Cache/Pub‑Sub** | Redis                            |
| **Auth**          | JWT + email magic‑link           |
| **Containers**    | Docker Compose                   |

![architecture](https://dummyimage.com/600x150/eeeeee/000000\&text=Client+↔+API+↔+DB/Cache)

## 6. Data Model (ER Diagram)

```
User(id, email, display_name, created_at)
Card(id, title, description, element, status, effort_estimate, created_by, created_at)
Session(id, name, status, created_at, started_at, ended_at)
Participant(id, user_id, session_id, alias)
Vote(id, session_id, card_id, participant_id, value, created_at)
```

## 7. API Specification (REST)

| Method | Path                  | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | /cards                | Submit new card               |
| GET    | /cards                | List/search cards             |
| PATCH  | /cards/\:id           | Update card (status/estimate) |
| POST   | /sessions             | Create session                |
| POST   | /sessions/\:id/join   | Join session                  |
| POST   | /sessions/\:id/vote   | Cast vote                     |
| POST   | /sessions/\:id/reveal | Reveal votes                  |
| GET    | /kpi/summary          | Aggregate KPIs                |

### WebSocket Events

| Event         | Payload                        |
| ------------- | ------------------------------ |
| session\:join | {sessionId, participant}       |
| vote\:cast    | {cardId, participantId, value} |
| votes\:reveal | {cardId, votes\[]}             |
| session\:end  | {sessionId, summary}           |

## 8. Frontend Screens

1. **Auth / Onboarding**
2. **Home** – Navigation tiles
3. **Submit Card**
4. **All Cards** – filters, search, status chips
5. **Poker Room** – card queue, Fibonacci buttons, participant list, reveal & statistics

## 9. Docker Compose (excerpt)

```yaml
version: "3.9"
services:
  api:
    build: ./backend
    ports: ["4000:4000"]
    env_file: .env
    depends_on: [db, redis]
  client:
    build: ./client
    ports: ["19006:19006"]  # Expo web
    depends_on: [api]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: pokerpass
    volumes: ["db_data:/var/lib/postgresql/data"]
  redis:
    image: redis:7-alpine
volumes:
  db_data:
```

## 10. KPI Metrics

* Time from card submission → estimation
* Vote standard deviation per card
* Element distribution (Fire/Earth/Air/Water)
* Team velocity trends

## 11. Open Questions

1. Preferred ingestion method for cards besides UI?
2. Guest/anonymous access or email‑only?
3. Do we need a facilitator role per session?
4. Max concurrent sessions?

## 12. Roadmap (Draft)

| Week | Deliverable                     |
| ---- | ------------------------------- |
| 1    | Repo scaffolding, DB migrations |
| 2    | Auth flow & card CRUD           |
| 3    | Poker session WS MVP            |
| 4    | KPI endpoints & charts          |

## 13. Contribution Guide

* Conventional Commits
* ESLint + Prettier + Husky
* CI: GitHub Actions
