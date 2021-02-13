import { IConfig } from '@ts';
// NOTE: base config must be imported before others because it reads .env file
import baseConfig from './base';
import expressConfig from './express';
import graphqlConfig from './graphql';
import mongooseConfig from './mongoose';

const config: IConfig = {
  base: baseConfig,
  express: expressConfig,
  graphql: graphqlConfig,
  mongoose: mongooseConfig,
};

export default config;
