import { CONFIG_DEFAULT } from '@constants';
import { IExpressConfig, IExpressUrlScheme, IProcessEnv } from '@ts';

const { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL }: IProcessEnv = process.env;

const urlScheme: IExpressUrlScheme = {
  host: SERVER_HOST || CONFIG_DEFAULT.HOST,
  port: SERVER_PORT ? parseInt(SERVER_PORT, 10) : null,
  protocol: SERVER_PROTOCOL || 'http',
};

const config: IExpressConfig = {
  ...urlScheme,
  url: `${urlScheme.protocol}://${urlScheme.host}${
    urlScheme.port ? `:${urlScheme.port}` : ''
  }`,
};

export default config;
