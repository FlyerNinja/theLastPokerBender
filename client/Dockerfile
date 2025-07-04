FROM node:20-alpine
WORKDIR /app
RUN npm install -g expo-cli
COPY package.json tsconfig.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "run", "start"]
