FROM node:14-alpine
RUN npm install -g npm@7

WORKDIR /usr/src/app

COPY shared/ shared/
COPY backend/package*.json backend/openapi.yml backend/
COPY backend/build/ backend/build

COPY package*.json ./
RUN npm install --production
EXPOSE 3001
CMD ["npm", "start"]
