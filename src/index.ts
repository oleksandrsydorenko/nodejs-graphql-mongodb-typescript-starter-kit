import express, { Application } from 'express';

import config from './config';
import loaders from './loaders';
import { logInfo, terminateProcess } from './utils';

const startServer = async (): Promise<void> => {
  const app: Application = express();

  try {
    await loaders(app);
  } catch (e) {
    terminateProcess(e);
  }

  app
    .listen(config.server.port, () => {
      logInfo(`Express Server is running on ${config.server.url}`);

      if (config.env.isDevelopment) {
        logInfo(
          `Apollo GraphQL playground is running on ${config.graphql.url}`,
        );
      }
    })
    .on('error', e => {
      terminateProcess(e);
    });
};

startServer();
