# Single image used for both the API server and the Vite dev server.
FROM node:22-alpine

WORKDIR /app

# Install deps first so they cache independently of source changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build the frontend so server.js can serve ./dist. No secrets are needed here:
# nothing in src/ reads import.meta.env, so the image stays credential-free.
RUN npm run build

# 3000 = Express API + built frontend, 5173 = Vite dev server (dev profile).
EXPOSE 3000 5173

CMD ["node", "server.js"]
