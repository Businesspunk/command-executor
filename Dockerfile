FROM node:18.9-alpine

COPY package.json ./

RUN apk add --no-cache ffmpeg && \    
    npm install -g npm@9.2.0 && \
    npm i -g typescript && \
    npm i