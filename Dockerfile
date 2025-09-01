# ---------------------
# Build stage
# ---------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files (for caching dependencies)
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies
RUN npm install

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build


# ---------------------
# Production stage
# ---------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "run", "start"]
