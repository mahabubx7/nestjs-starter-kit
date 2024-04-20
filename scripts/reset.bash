#!/bin/bash

# Set the project name
PROJECT_NAME="$1" # Pass the project name as an argument

# Stop and remove containers
docker compose --project-name $PROJECT_NAME down

# Remove volumes
docker compose --project-name $PROJECT_NAME down -v

# Remove images
docker compose --project-name $PROJECT_NAME rm -f

# Remove networks
docker compose --project-name $PROJECT_NAME network prune -f