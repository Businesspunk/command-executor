FROM node:18.9-alpine

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && \
    python3 -m ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools

# Install NPM
RUN npm install -g npm@9.6.2 && \
    npm i -g typescript

# Install FFMPEG
RUN apk add --no-cache ffmpeg

# Install Youtube-dl
RUN python3 -m pip install https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz