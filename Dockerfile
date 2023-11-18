# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3030

# Start the Node.js application
CMD ["npm", "start"]