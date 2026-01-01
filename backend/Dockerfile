FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
