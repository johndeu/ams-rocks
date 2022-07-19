FROM node:current-alpine
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app

# Must use the /wocket path here to avoid copying stuff from above
COPY /wocket/package.json .
COPY /wocket/yarn.lock .

# install ffmpeg and npm
RUN apk add  --no-cache ffmpeg && npm install --omit:dev

# Must use the /wocket path here to avoid copying stuff from above
COPY /wocket/. .

# build the Next.js app
RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]