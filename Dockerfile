# Build stage
FROM oven/bun:latest AS build-stage
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* bun.lockb* ./

# Install dependencies
RUN bun install

# Copy project files
COPY . .

# Build the project
RUN bun run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
