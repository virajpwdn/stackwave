#Client Docker File

#Step 1: Building the App
FROM node:23.11.0-alpine3.20 AS builder

WORKDIR /client
COPY . .

RUN npm install
RUN npm run build

#Step 2: Installing nginx server
FROM nginx:alpine
COPY --from=builder /client/dist /usr/share/nginx/html
EXPOSE 80