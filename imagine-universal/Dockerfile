FROM node:boron

RUN npm install replace -g

COPY dist /usr/html/dist
COPY dist-server /usr/html/dist-server
COPY server.js /usr/html
COPY package.json /usr/html

WORKDIR /usr/html
RUN npm install
RUN npm run postinstall

ADD startup.sh startup.sh

EXPOSE 3000
CMD ["bash", "startup.sh"]
