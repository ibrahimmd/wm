FROM node:15.0.1

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "node", "app.js" ]
