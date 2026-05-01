# Stage 1: Builder
FROM node:lts-alpine3.22 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Runner
FROM node:lts-alpine3.22 AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache ffmpeg
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3030
ENV PORT=3030
CMD ["node", "dist/main.js"]