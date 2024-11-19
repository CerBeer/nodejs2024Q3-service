# Home Library Service

## Prerequisites

Since the task specifies:
- ```Your built image is pushed to DockerHub```

The created application image is uploaded to DockerHub, the testing script tests it.
The Postres image was not created, but in accordance with the task recommendations, a special image was taken from DockerHub

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

## Downloading

```
git clone https://github.com/CerBeer/nodejs2024Q3-service
```

## Change directory

```
cd nodejs2024Q3-service
```

## Switch branch

```
git checkout develop-pt2
```

## Installing NPM modules

```
npm install
```

## For Windows Open wsl terminal

## Run containers

```
npm run docker:start
```

## Wait until the application is fully launched
#### the necessary images are downloaded, containers are assembled and launched, this will be indicated by the appearance of the following message in the terminal

- ```[NestApplication] Nest application successfully started```

## After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing

```
http://localhost:4000/doc/
```

## Open another wsl console and run the command to run a general test

```
npm run test
```

## To run tests one by one

```
npm run test user && npm run test album && npm run test artist && npm run test track && npm run test favorites
```

## Stop containers

```
npm run docker:stop
```

## Check docker images size

```
npm run docker:images
```

## Scan Docker image for vulnerabilities

```
npm run docker:scan
```

# What else can you do

## Auto-fix and format

```
npm run lint
```

```
npm run format
```
