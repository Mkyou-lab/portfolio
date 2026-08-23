# ---- Stage 1: Build Frontend ----
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies cleanly
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Build the React static files
RUN npm run build


# ---- Stage 2: Production Server ----
FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend production dependencies
RUN cd backend && npm install --omit=dev

# Copy backend source
COPY backend/ ./backend/

# Copy built frontend static files from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Create uploads directory for user images
RUN mkdir -p /app/backend/uploads

EXPOSE 3000

CMD ["node", "backend/server.js"]
