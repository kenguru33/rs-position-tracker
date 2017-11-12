FROM node:8.9
MAINTAINER Bernt Anker
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 8080
ENTRYPOINT [ "node", "./app.js" ]
