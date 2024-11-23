# Stage 1: Build TypeScript
FROM node:23 AS builder

WORKDIR /opt/WaclanBot/

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and configuration
COPY . .

# Generate Prisma client and build TypeScript
RUN npx prisma db push && \
    npm run build

# Stage 2: Create production image
FROM node:23-slim

ENV NODE_ENV=production

WORKDIR /opt/WaclanBot/

# Install necessary tools
RUN apt-get update && apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy compiled code and necessary files from the builder stage
COPY --from=builder /opt/WaclanBot/dist ./dist
COPY --from=builder /opt/WaclanBot/src/utils/LavaLogo.txt ./src/utils/LavaLogo.txt
COPY --from=builder /opt/WaclanBot/prisma ./prisma
COPY --from=builder /opt/WaclanBot/scripts ./scripts
COPY --from=builder /opt/WaclanBot/locales ./locales

# Install production dependencies
COPY --from=builder /opt/WaclanBot/package*.json ./
RUN npm install --omit=dev

# Generate Prisma client
RUN npx prisma generate
RUN npx prisma db push

# Ensure application.yml is a file, not a directory
RUN rm -rf /opt/WaclanBot/application.yml && \
    touch /opt/WaclanBot/application.yml

# Run as non-root user
RUN addgroup --gid 322 --system WaclanBot && \
    adduser --uid 322 --system WaclanBot && \
    chown -R WaclanBot:WaclanBot /opt/WaclanBot/

USER WaclanBot

CMD ["node", "dist/index.js"]
