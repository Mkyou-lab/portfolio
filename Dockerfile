FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

COPY backend/ ./backend/
COPY frontend/dist ./frontend/dist
RUN mkdir -p /app/backend/uploads

EXPOSE 3000

CMD ["node", "backend/server.js"]
