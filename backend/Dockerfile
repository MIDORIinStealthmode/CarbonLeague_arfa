FROM node:latest

RUN apt update && apt -y upgrade

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app
