FROM node:8.16.0-alpine

RUN npm install -g yarn nodemon

RUN apk update && apk upgrade && \
	apk add --no-cache git make gcc g++ python

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY *.lock ./
RUN yarn install --only=production

COPY client/package*.json ./client/
COPY client/*.lock ./client/
RUN cd client && yarn install --only=production

# Bundle app source
COPY . .

RUN cd client && yarn build && cd ../ && yarn install --only=production

EXPOSE 5000

CMD [ "yarn", "server" ]
