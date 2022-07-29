FROM node:current-alpine

# ENV
ENV NODE_OPTIONS=--openssl-legacy-provider

ENV TIMEOUT_LIVE_STREAM_SECONDS=300 

WORKDIR /app

# Must use the /wocket path here to avoid copying stuff from above
COPY package.json .
COPY yarn.lock .

# install ffmpeg and npm
RUN apk add  --no-cache ffmpeg && npm install --omit:dev

# Must use the /wocket path here to avoid copying stuff from above
COPY . .

# build the Next.js app
RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]