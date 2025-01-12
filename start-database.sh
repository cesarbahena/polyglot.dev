#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

echo "Starting database container..."
docker compose up -d db

echo "Waiting for database to be healthy..."
# Loop until the database service is healthy
for i in $(seq 1 60); do
  HEALTH_STATUS=$(docker compose ps -q db | xargs docker inspect -f {{.State.Health.Status}} 2>/dev/null || true)
  if [ "$HEALTH_STATUS" = "healthy" ]; then
    echo "Database is healthy!"
    exit 0
  fi
  echo "Database status: $HEALTH_STATUS. Waiting 1 second..."
  sleep 1
done

echo "Error: Database did not become healthy in time."
exit 1