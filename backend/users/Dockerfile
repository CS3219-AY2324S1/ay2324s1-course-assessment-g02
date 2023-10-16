# Use an official Node runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./
COPY ../prisma ./prisma/

# Install dependencies
RUN npm install
RUN npm install -g prisma

# Copy the rest of the code into the container
COPY . .

# Generate prisma client
RUN npx prisma generate --schema ./prisma/schema.prisma


# Command to run the application
CMD ["npm", "start"]
