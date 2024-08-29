FROM node:22-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json .

RUN npm install --cache /tmp/empty-cache --prefer-offline 

COPY . .

CMD [ "npm", "run", "dev"]

EXPOSE 5000