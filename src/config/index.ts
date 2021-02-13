import { IConfig } from '@ts';
// NOTE: base config must be imported before others because it reads .env file
import baseConfig from './base';
import apolloConfig from './apollo';
import expressConfig from './express';
import mongooseConfig from './mongoose';

const config: IConfig = {
  base: baseConfig,
  apollo: apolloConfig,
  express: expressConfig,
  mongoose: mongooseConfig,
};

export default config;
