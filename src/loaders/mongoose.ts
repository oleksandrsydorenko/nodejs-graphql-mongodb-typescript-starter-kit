import { connect, connection, models } from 'mongoose';

import config from '@config';
import { log, terminateProcess } from '@utils';

export default async (): Promise<void> => {
  connection.on('error', log.error);
  connection.on('open', () => {
    log.info(
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

    if (config.mongoose.isErasingEnabled) {
      await Promise.all(
        Object.values(models).map(async model => model.deleteMany({})),
      );
      log.info('Data erased successfully');
    }
  } catch (e) {
    terminateProcess(e);
  }
};
