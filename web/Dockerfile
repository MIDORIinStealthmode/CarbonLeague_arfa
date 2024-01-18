FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3
RUN npm install -g npm@10.3.0
