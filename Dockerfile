# -------------------------
    # 1. Dependencies
    # -------------------------
    FROM node:22-bookworm-slim AS dependencies
    
    WORKDIR /app
    
    COPY package.json package-lock.json ./
    
    RUN npm ci
    
    
    # -------------------------
    # 2. Build
    # -------------------------
    FROM dependencies AS builder
    
    WORKDIR /app
    
    COPY . .
    
    # Prisma 7 loads prisma.config.ts during generation.
    # Generation does not need a live database, but the
    # configuration expects DATABASE_URL to exist.
    RUN DATABASE_URL="postgresql://user:password@localhost:5432/database" \
        npx prisma generate
    
    RUN npm run build
    
    
    # -------------------------
    # 3. Production runtime
    # -------------------------
    FROM node:22-bookworm-slim AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    COPY package.json package-lock.json ./
    
    RUN npm ci --omit=dev && npm cache clean --force
    
    COPY --from=builder /app/dist ./dist
    
    EXPOSE 3000
    
    CMD ["npm", "run", "start:prod"]