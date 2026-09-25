#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")/.."
umask 077
mkdir -p backups
backup_file="backups/athletes-$(date -u +%Y%m%dT%H%M%SZ).dump"
docker compose -f compose.production.yml exec -T postgres \
  pg_dump -U athletes -d athletes_match_db -Fc > "$backup_file"
printf 'Backup: %s\n' "$backup_file"
