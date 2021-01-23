import express, { Application } from 'express';

import config from './config';
import loaders from './loaders';
import { error, log } from './utils';

const startServer = async (): Promise<void> => {
  const app: Application = express();

  loaders(app);

  app
    .listen(config.expressServer.port, () => {
      log(`Server is running on ${config.expressServer.url}`);

      if (config.env.isDevelopment) {
        log(`GraphQL playground is running on ${config.apolloServer.url}`);
      }
    })
    .on('error', err => {
      error(err);
      process.exit(1);
    });
};

startServer();
