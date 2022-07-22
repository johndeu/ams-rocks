FROM node:current-alpine

# ENV
ENV NODE_OPTIONS=--openssl-legacy-provider
# timeout set to 5 minutes using this env variable
ENV TIMEOUT_LIVE_STREAM_SECONDS=120 

WORKDIR /app

ARG pathAzure=/wocket/
ARG pathlocal=

# Must use the /wocket path here to avoid copying stuff from above
COPY ${pathlocal}package.json .
COPY ${pathlocal}yarn.lock .

# install ffmpeg and npm
RUN apk add  --no-cache ffmpeg && npm install --omit:dev

# Must use the /wocket path here to avoid copying stuff from above
COPY ${pathlocal}. .

# build the Next.js app
RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]