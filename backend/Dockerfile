FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install && npm cache clean --force
COPY src ./src
RUN npm run build
CMD ["npm", "run", "start:dev"]
