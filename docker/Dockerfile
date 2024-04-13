# Use the official Node.js 20 image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install --frozen

# Copy the rest of the app source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app will run on
# Note: Change this as you see fit
EXPOSE 3000

# Start the app
# Note: Change this as you see fit
CMD [ "npm", "run", "start:prod", "--host", "0.0.0.0"]