import express, { Application } from 'express';

import config from './config';
import loaders from './loaders';
import { logInfo, terminateProcess } from './utils';

const startServer: Function = async (): Promise<void> => {
  const app: Application = express();

  try {
    await loaders(app);
  } catch (e) {
    terminateProcess(e);
  }

  app
    .listen(config.express.port, () => {
      logInfo(`Express Server is running on ${config.express.url}`);

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
