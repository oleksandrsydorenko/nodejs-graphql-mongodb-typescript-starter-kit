import { IApolloConfig, IApolloUrlScheme, IProcessEnv } from '@ts';

import baseConfig from './base';
import expressConfig from './express';

const { SERVER_ALLOWED_ORIGINS }: IProcessEnv = process.env;

const urlScheme: IApolloUrlScheme = {
  path: '/graphql',
};

const CACHE_MAX_AGE_IN_SECONDS = 60;

const config: IApolloConfig = {
  ...urlScheme,
  cacheOptions: {
    isExtensionFormattingEnabled: false,
    isHttpHeadersAllowed: true,
    maxAge: CACHE_MAX_AGE_IN_SECONDS,
  },
  isIntrospectionEnabled: baseConfig.env.isDevelopment,
  isPlaygroundEnabled: baseConfig.env.isDevelopment,
  isTracingEnabled: baseConfig.env.isDevelopment,
  maxDepth: 3,
  origin: SERVER_ALLOWED_ORIGINS ? SERVER_ALLOWED_ORIGINS.split(',') : false,
  url: `${expressConfig.url}${urlScheme.path}`,
};

export default config;
