FROM node:carbon-alpine
MAINTAINER Bernt Anker
COPY . /src
WORKDIR /src
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
EXPOSE 8080
ENTRYPOINT [ "node", "./app.js" ]