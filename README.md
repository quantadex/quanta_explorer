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

    # or `make local-up`

# Production builds

    ./build-docker.sh

    # or `make push`

This will build a docker image and push it to AWS ECR.

If you do not want to build, set the `NOPUSH=1` env variable, e.g.

    NOPUSH=1 ./build-docker.sh

    # or `make build`

If you want to run the app using this docker image:

    make up

This is different than the `docker-compose` method as it ensures that you are using the exact same docker image as what production will use.

# Configuration

## `client/src/config.js`

Most configuration options are hard coded in this file.

## environment

The following environment variable is honored:

* `PORT` (default=5000)

   The listening port of the server.

