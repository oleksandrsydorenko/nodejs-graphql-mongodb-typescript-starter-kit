import dotenv, { DotenvConfigOutput } from 'dotenv';
import { IBaseConfig, IProcessEnv } from '@ts';

const env: DotenvConfigOutput = dotenv.config();

if (env.error) {
  throw new Error('.env file is missing');
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const { DEBUG, NODE_ENV }: IProcessEnv = process.env;

const config: IBaseConfig = {
  debugConfig: DEBUG || '',
  env: {
    isDevelopment: NODE_ENV === 'development',
    isProduction: NODE_ENV === 'production',
    type: NODE_ENV,
  },
};

export default config;
