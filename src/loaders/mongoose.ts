import { connect, connection } from 'mongoose';

import config from '@config';

import { logError, logInfo, terminateProcess } from '@utils';

export default async (): Promise<void> => {
  connection.on('error', logError);
  connection.on('open', () => {
    logInfo(
      `Mongoose is connected to ${config.mongoose.url}/${config.mongoose.name}`,
    );
  });

  try {
    await connect(config.mongoose.url, {
      dbName: config.mongoose.name,
      pass: config.mongoose.password,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: config.mongoose.username,
    });
  } catch (e) {
    terminateProcess(e);
  }
};
