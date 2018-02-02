FROM node:boron

COPY dist /usr/html/dist
COPY dist-server /usr/html/dist-server
COPY server.js /usr/html
COPY package.json /usr/html

WORKDIR /usr/html
RUN npm install
RUN npm run postinstall

EXPOSE 3000
CMD ["node" , "server.js"]
