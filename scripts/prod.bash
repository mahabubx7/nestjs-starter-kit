#!/bin/bash

# Set the environment variables
export NODE_ENV=production # Node.js level declaration
export APP_ENV=production # Nest.js app level declaration

arguments = "$1"

# Start the Docker container
docker compose -p nestjs_app -f docker/docker-compose.yml up -d $arguments

# Check if the container is running
if [ "$(docker ps -q -f name=nestjs_app)" ]; then
    echo "Server 🚀 started successfully!"
else
    echo "Failed ❌ to start the server."
fi
