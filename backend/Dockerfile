# Build từ thư mục backend: docker build -t qlsk-api .
# Hoặc từ root repo: docker build -f backend/Dockerfile -t qlsk-api backend

FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
