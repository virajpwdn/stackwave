#Client Docker File

#Step 1: Building the App
FROM node:23.11.0-alpine3.20 AS builder

WORKDIR /client

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

#Step 2: Installing nginx server
FROM nginx:alpine
COPY --from=builder /client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]