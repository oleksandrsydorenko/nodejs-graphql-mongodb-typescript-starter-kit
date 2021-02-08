import { IGraphQLConfig, IGraphQLUrlScheme, IProcessEnv } from '@ts';
import expressConfig from './express';

const { SERVER_ALLOWED_ORIGINS }: IProcessEnv = process.env;

const urlScheme: IGraphQLUrlScheme = {
  path: '/graphql',
};

const config: IGraphQLConfig = {
  ...urlScheme,
  origin: SERVER_ALLOWED_ORIGINS ? SERVER_ALLOWED_ORIGINS.split(',') : false,
  url: `${expressConfig.url}${urlScheme.path}`,
};

export default config;
