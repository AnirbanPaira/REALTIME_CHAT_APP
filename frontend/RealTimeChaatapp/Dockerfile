FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY frontend/RealTimeChaatapp/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY frontend/RealTimeChaatapp/ .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY frontend/RealTimeChaatapp/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

