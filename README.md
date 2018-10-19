# Pre Requirement

Node: > 8.x

Npm: > 6.x

Yarn: > 1.9.x

# Install Guide

```
Development

clone repository: git clone https://github.com/quantadex/quanta_explorer.git
cd quanta_explorer

yarn install (to install dependencies)
yarn dev

Then you can see frontend is running on localhost:3000
```

```
Deployment

clone repository: git clone https://github.com/quantadex/quanta_explorer.git
cd quanta_explorer

yarn install (to install dependencies)
yarn build

Then you can see frontend is running on localhost:5000
```

If you want to add dependency for frontend, then please use `yarn add` in client folder.

# Docker

If you prefer docker, the usual `docker-compose` command will build the docker and start the server.

    docker-compose build
    docker-compose up

# Configuration

The following environment variable is honored:

* `PORT` (default=5000)

   The listening port of the server.

