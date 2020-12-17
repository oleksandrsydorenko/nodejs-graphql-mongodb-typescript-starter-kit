import express, { Application } from 'express';

import config from './config';
import loaders from './loaders';
import { error, log } from './utils';

async function startServer() {
  const app: Application = express();

  loaders(app);

  app
    .listen(config.expressServer.port, () => {
      log(`Apollo Server is listening on ${config.apolloServer.url}`);
    })
    .on('error', err => {
      error(err);
      process.exit(1);
    });
}

startServer();
