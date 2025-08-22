# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies with optimization
RUN npm ci --prefer-offline --no-audit --production=false

# Copy source code
COPY . .

# Build application with production optimization
RUN npm run build

# Production stage
FROM nginx:alpine

# Install necessary packages
RUN apk add --no-cache curl

# Copy built files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create health check file
RUN echo "healthy" > /usr/share/nginx/html/health

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
