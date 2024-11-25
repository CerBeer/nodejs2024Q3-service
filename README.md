# Home Library Service

## Prerequisites

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
git checkout develop-pt3
```

## Installing NPM modules

```
npm install
```

## For Windows Open wsl terminal

## Run database and app containers

```
npm run docker:start
```

## Or Run database container and start app local. This will allow you to see the logs in the logs folder in the application folder

```
npm run docker:pg:start
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
npm run test:auth
```

## To run tests one by one

```
npm run test:auth user && npm run test:auth album && npm run test:auth artist && npm run test:auth track && npm run test:auth favorites
```

## Stop database and app containers

```
npm run docker:stop
```

## OR Stop database container and app

```
press ctrl+c to stop app and run command
npm run docker:pg:stop
```


# What else can you do

## Auto-fix and format

```
npm run lint
```

```
npm run format
```
