import mongoose from 'mongoose';

import config from '@config';

import { logError, logInfo, terminateProcess } from '@utils';

export default async (): Promise<void> => {
  mongoose.connection.on('error', logError);
  mongoose.connection.on('open', () => {
    logInfo(
      `Mongoose is connected to ${config.database.url}/${config.database.name}`,
    );
  });

  try {
    await mongoose.connect(config.database.url, {
      dbName: config.database.name,
      pass: config.database.password,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: config.database.username,
    });
  } catch (e) {
    terminateProcess(e);
  }
};
