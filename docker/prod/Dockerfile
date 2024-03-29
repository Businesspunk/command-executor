FROM node:18.9-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./tsconfig.build.json ./

COPY ./src ./src

RUN npm install -g npm@9.6.2 && \
    npm i -g typescript && \
    npm install --production && \
    npm run build

##################################

FROM node:18.9-alpine

WORKDIR /app

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && \
    python3 -m ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools && \
    # Install FFMPEG
    apk add --no-cache ffmpeg && \
    # Install Youtube-dl
    python3 -m pip install https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz && \
    # Clear cache
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "./dist/app.js"]