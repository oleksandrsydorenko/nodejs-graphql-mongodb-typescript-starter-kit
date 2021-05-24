# NodeJS-GraphQL-MongoDB-TypeScript Starter Kit

[![License MIT badge](https://img.shields.io/badge/License-MIT-red.svg)](/LICENSE) [![Up to date dependencies status badge](https://status.david-dm.org/gh/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit.svg)](https://david-dm.org/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit) [![Up to date devDependencies status badge](https://status.david-dm.org/gh/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit.svg?type=dev)](https://david-dm.org/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit?type=dev)

Starter kit for [Node.js](https://nodejs.org/) web applications build on [Express](https://expressjs.com/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [Mongoose](https://mongoosejs.com/), [Babel](https://babeljs.io/), [TypeScript](https://www.typescriptlang.org/) stack with preconfigured [ESlint](https://eslint.org/), [Prettier](https://prettier.io/), [Lint-Staged](https://github.com/okonet/lint-staged), [Commitlint](https://github.com/conventional-changelog/commitlint), [Husky](https://github.com/typicode/husky) and [Jest](https://jestjs.io/).

![NodeJS-GraphQL-MongoDB-TypeScript Starter Kit](logo.png 'NodeJS-GraphQL-MongoDB-TypeScript Starter Kit')

## Features

- Supporting the latest [EcmaScript](https://ecma-international.org/) features and feature proposals.
- Compiling TypeScript through [Babel](https://babeljs.io/).
- Preconfigured [Express](https://expressjs.com/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [Mongoose](https://mongoosejs.com/).
- Caching queries with [Response Cache Plugin](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-plugin-response-cache).
- Validating queries input data with [Graphql Constraint Directive Plugin](https://github.com/confuser/graphql-constraint-directive).
- Validation queries depth with [GraphQL Depth Limit Plugin](https://github.com/stems/graphql-depth-limit).
- Debugging with [Debug Plugin](https://github.com/visionmedia/debug).
- Linting and formatting JavaScript/TypeScript with [ESlint](https://eslint.org/), [Prettier](https://prettier.io/), [Lint-Staged](https://github.com/okonet/lint-staged#readme) and [Husky](https://github.com/typicode/husky#readme).
- Linting commit messages in accordance to [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) with [commitlint](https://github.com/conventional-changelog/commitlint#readme) and [Husky](hhttps://typicode.github.io/husky/#/).
- Testing with [Jest](https://jestjs.io/).

## Installation

Clone repository:

`git clone https://github.com/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit.git`

Install packages using npm:

`npm i`

or yarn:

`yarn`

## Usage

1. Setup Express and MongoDB ([read here](https://github.com/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit#environment-variables)).

Then

### In development mode

2. Run application

using npm:

`npm run start`

using yarn:

`yarn start`

### In production mode

2. Deploy application.

3. Build application

using npm:

`npm run build`

using yarn:

`yarn build`

4. Run application

using npm:

`npm run serve`

using yarn:

`yarn serve`

## Environment variables

`DB_ERASING_ENABLED` - enables erasing database on application start (set value to `true`).\
`DB_NAME`\* - database name.\
`DB_HOST`\* - database host.\
`DB_PASSWORD` - database password.\
`DB_PORT` - database port.\
`DB_PROTOCOL`\* - database protocol.\
`DB_USERNAME` - database username.\
`DEBUG` - debug utility config ([read here](https://github.com/visionmedia/debug#readme)).\
`SERVER_ALLOWED_ORIGINS` - list of origins allowed to connect to server separated by comma.\
`SERVER_HOST`\* - server host.\
`SERVER_PORT` - server port.\
`SERVER_PROTOCOL`\* - server protocol.

\* - required.

Find examples [here](https://github.com/oleksandrsydorenko/nodejs-graphql-mongodb-typescript-starter-kit/blob/master/.env.example).

## Scripts

`build` - compiles sources using Babel\
`lint` - runs ESlint and Prettier\
`lint:eslint` - runs ESlint linter\
`lint:prettier` - runs Prettier code formatter\
`serve` - runs application in production mode (requires `dist` folder with compiled sources)\
`start` - runs application in development mode\
`start:db` - runs MongoDB locally (needs MongoDB to be deployed locally)\
`test:coverage` - runs Jest and generates code coverage report\
`test:debug` - runs Jest in debug mode\
`test:silent` - runs Jest in silent mode\
`test:watch` - runs Jest in watch mode\
`ts:check` - compiles TypeScript without output\
`ts:watch` - compiles TypeScript without output in watch mode

## Stack

[Node.js](https://reactjs.org/)\
[TypeScript](https://www.typescriptlang.org/)\
[Express](https://expressjs.com/)\
[GraphQL](https://graphql.org/)\
[Apollo Server](https://www.apollographql.com/docs/apollo-server/)\
[MongoDB](https://www.mongodb.com/)\
[Mongoose](https://mongoosejs.com/)\
[Babel](https://babeljs.io/)\
[ESlint](https://eslint.org/)\
[Prettier](https://prettier.io/)\
[Jest](https://jestjs.io/)

## License

[MIT](/LICENSE)
