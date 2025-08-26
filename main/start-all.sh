#!/bin/bash
set -e

echo "Stopping and cleaning up containers..."
docker compose down --volumes --remove-orphans

echo "Running builder..."
docker compose run --rm builder

echo "Starting all services in detached mode..."
docker compose up -d

echo "FitBoard is running!"