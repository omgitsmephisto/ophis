FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm i

COPY . .

CMD ["sh", "-c", "pnpm run migration:run && pnpm run start:dev"]