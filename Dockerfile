FROM node:18.9-alpine

RUN apk add ffmpeg && \
    npm i -g typescript && \
    rm -rf /var/cache/apk/*