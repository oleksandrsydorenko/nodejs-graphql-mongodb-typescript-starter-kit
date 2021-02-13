import express, { Application } from 'express';

import config from './config';
import loaders from './loaders';
import { log, terminateProcess } from './utils';

const startServer = async (): Promise<void> => {
  const app: Application = express();

  try {
    await loaders(app);
  } catch (e) {
    terminateProcess(e);
  }

  app
    .listen(config.express.port, () => {
      log.info(`Express Server is running on ${config.express.url}`);

      if (config.base.env.isDevelopment) {
        log.info(
          `Apollo GraphQL playground is running on ${config.apollo.url}`,
        );
      }
    })
    .on('error', e => {
      terminateProcess(e);
    });
};

startServer();
