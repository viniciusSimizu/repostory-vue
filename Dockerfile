FROM node:18-alpine3.15
WORKDIR /usr/src

COPY package.json .
RUN yarn install

COPY . .

RUN yarn build

CMD yarn preview

EXPOSE 4173