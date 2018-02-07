FROM node:boron

RUN \
  apt-get update \
  && apt-get -y install gettext-base \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY dist /usr/html/dist
COPY dist-server /usr/html/dist-server
COPY server.js /usr/html
COPY package.json /usr/html

WORKDIR /usr/html
RUN npm install
RUN npm run postinstall

ADD startup.sh startup.sh

EXPOSE 3000
CMD ["startup.sh"]
