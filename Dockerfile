FROM node:14

WORKDIR /usr/src/app

RUN npm install --global npm

COPY . .

RUN npm install

RUN npm run build

USER node

EXPOSE 3000

CMD ["npm", "start"]
