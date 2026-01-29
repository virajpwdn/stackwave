#Server Dockerfile

FROM node:23.11.0-alpine3.20
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "node", "server.js"]