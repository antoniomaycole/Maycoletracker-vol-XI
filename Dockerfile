### Multi-stage Dockerfile for MaycoleTracker
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY api_server.js ./
RUN npm ci --production --no-audit --no-fund
EXPOSE 3000
CMD ["node", "api_server.js"]
