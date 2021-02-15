import { IApolloConfig, IApolloUrlScheme, IProcessEnv } from '@ts';

import baseConfig from './base';
import expressConfig from './express';

const { SERVER_ALLOWED_ORIGINS }: IProcessEnv = process.env;

const urlScheme: IApolloUrlScheme = {
  path: '/graphql',
};

const config: IApolloConfig = {
  ...urlScheme,
  cache: {
    isExtensionFormattingEnabled: false,
    isHttpHeadersAllowed: true,
    // in seconds
    maxAge: 60,
  },
  isIntrospectionEnabled: baseConfig.env.isDevelopment,
  isPlaygroundEnabled: baseConfig.env.isDevelopment,
  isTracingEnabled: baseConfig.env.isDevelopment,
  query: {
    depth: {
      ignoreList: [],
      max: 3,
    },
  },
  origin: SERVER_ALLOWED_ORIGINS ? SERVER_ALLOWED_ORIGINS.split(',') : false,
  url: `${expressConfig.url}${urlScheme.path}`,
};

export default config;
