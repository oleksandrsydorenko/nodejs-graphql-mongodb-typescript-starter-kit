import { connect, connection, models } from 'mongoose';

import config from '@config';
import { log, terminateProcess } from '@utils';

const {
  dbName,
  isCreateIndexEnabled,
  isErasingEnabled,
  isNewUrlParserEnabled,
  isUnifiedTopologyEnabled,
  password,
  url,
  username,
} = config.mongoose;

export default async (): Promise<void> => {
  connection.on('error', log.error);
  connection.on('open', () => {
    log.info('Mongoose is connected to %s/%s', url, dbName);
  });

  try {
    await connect(url, {
      dbName,
      pass: password,
      // enables new driver's createIndex() instead of the old ensureIndex() one
      useCreateIndex: isCreateIndexEnabled,
      // enables new url connection string parser
      useNewUrlParser: isNewUrlParserEnabled,
      // enables new server discover and monitoring engine
      useUnifiedTopology: isUnifiedTopologyEnabled,
      user: username,
    });

    if (isErasingEnabled) {
      await Promise.all(
        Object.values(models).map(async model => model.deleteMany({})),
      );
      log.info('Data erased successfully');
    }
  } catch (e) {
    terminateProcess(e);
  }
};
