FROM node:current-alpine
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /wocket

COPY /wocket/package.json .
COPY /wocket/server.js .

RUN apk add  --no-cache ffmpeg && npm install --production

COPY /wocket .

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]