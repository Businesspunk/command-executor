FROM node:18.9-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./

COPY ./src ./src

RUN npm install -g npm@9.4.1 && \
    npm i -g typescript && \
    npm install --production && \
    npm run compile

##################################

FROM node:18.9-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules