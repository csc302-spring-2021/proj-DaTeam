# Base image with OS dependencies installed
FROM node:14-alpine
RUN npm install -g npm@7
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
