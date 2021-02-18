import { CONFIG_DEFAULT } from '@constants';
import { IMongooseConfig, IMongooseUrlScheme, IProcessEnv } from '@ts';
import baseConfig from './base';

const {
  DB_HOST,
  DB_ERASING_ENABLED,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_PROTOCOL,
  DB_USERNAME,
}: IProcessEnv = process.env;

if (!DB_NAME) {
  throw new Error('DB_NAME is missing in .env file');
}

const urlScheme: IMongooseUrlScheme = {
  host: DB_HOST || CONFIG_DEFAULT.HOST,
  port: DB_PORT ? parseInt(DB_PORT, 10) : null,
  protocol: DB_PROTOCOL || 'mongodb',
};

const config: IMongooseConfig = {
  ...urlScheme,
  dbName: DB_NAME,
  // enables new MongoDB driver's createIndex() function instead of the deprecated one ensureIndex()
  isCreateIndexEnabled: true,
  // enables db collections erasing on server start
  isErasingEnabled:
    baseConfig.env.isDevelopment && DB_ERASING_ENABLED === 'true',
  // enables deprecated MongoDB driver's findAndModify() function instead of the new one findOneAndUpdate()
  isFindAndModifyEnabled: false,
  // enables new url connection string parser
  isNewUrlParserEnabled: true,
  // enables new server discovery and monitoring engine
  isUnifiedTopologyEnabled: true,
  password: DB_PASSWORD,
  url: `${urlScheme.protocol}://${urlScheme.host}${
    urlScheme.port ? `:${urlScheme.port}` : ''
  }`,
  username: DB_USERNAME,
};

export default config;
