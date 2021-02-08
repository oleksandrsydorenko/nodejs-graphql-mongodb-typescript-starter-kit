import { IConfig } from '@ts';
// NOTE: env config must be imported before others because it reads .env file
import envConfig from './env';
import expressConfig from './express';
import graphqlConfig from './graphql';
import mongooseConfig from './mongoose';

const config: IConfig = {
  env: envConfig,
  express: expressConfig,
  graphql: graphqlConfig,
  mongoose: mongooseConfig,
};

export default config;
