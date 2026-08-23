# ---- Stage 1: Build Frontend ----
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Force development mode in Stage 1 so npm installs Vite & build tools
ENV NODE_ENV=development

# Copy frontend package files
COPY frontend/package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install --include=dev

# Copy frontend source files
COPY frontend/ ./

# Build the production React assets
RUN npm run build


# ---- Stage 2: Production Server ----
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend production dependencies only
RUN cd backend && npm install --omit=dev

# Copy backend source code
COPY backend/ ./backend/

# Copy built frontend static files from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Create uploads folder for user images
RUN mkdir -p /app/backend/uploads

EXPOSE 3000

CMD ["node", "backend/server.js"]
