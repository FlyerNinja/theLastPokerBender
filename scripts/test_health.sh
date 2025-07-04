#!/bin/sh
set -e
MAX_ATTEMPTS=10
ATTEMPT=1
until curl -sf http://localhost:4000/health > /tmp/health.json; do
  if [ "$ATTEMPT" -ge "$MAX_ATTEMPTS" ]; then
    echo "API did not become healthy in time" >&2
    exit 1
  fi
  echo "Waiting for API... ($ATTEMPT/$MAX_ATTEMPTS)"
  ATTEMPT=$((ATTEMPT+1))
  sleep 3
done
grep -q '"status":"ok"' /tmp/health.json && echo "Health endpoint OK"
