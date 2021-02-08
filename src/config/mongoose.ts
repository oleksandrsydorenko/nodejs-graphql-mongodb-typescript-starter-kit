import { CONFIG_DEFAULT } from '@constants';
import { IMongooseConfig, IMongooseUrlScheme, IProcessEnv } from '@ts';

const {
  DB_HOST,
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
  name: DB_NAME,
  password: DB_PASSWORD,
  url: `${urlScheme.protocol}://${urlScheme.host}${
    urlScheme.port ? `:${urlScheme.port}` : ''
  }`,
  username: DB_USERNAME,
};

export default config;
