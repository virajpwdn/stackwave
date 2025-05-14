#Server Dockerfile

FROM node:23.11.0

#create a group so that container will not have access as root rather as non-root user
RUN apt-get update && apt-get install -y sudo passwd \
    && addgroup --system appgroup \
    && adduser --system --ingroup appgroup appuser

WORKDIR /server
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER appuser

EXPOSE 3000
CMD [ "node", "server.js"]