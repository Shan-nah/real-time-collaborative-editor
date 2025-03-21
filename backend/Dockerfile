# Use Node.js 18 as base image
FROM node:18

# Set the working directory
WORKDIR /app/backend

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all other files
COPY . .

# Expose the port
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
