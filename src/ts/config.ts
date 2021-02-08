export interface IEnvConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  type: string;
}

export interface IExpressUrlScheme {
  host: string;
  port: number | null;
  protocol: string;
}

export interface IExpressConfig extends IExpressUrlScheme {
  url: string;
}

export interface IGraphQLUrlScheme {
  path: string;
}

export interface IGraphQLConfig extends IGraphQLUrlScheme {
  origin: boolean | string | string[];
  url: string;
}

export interface IMongooseUrlScheme {
  host: string;
  port: number | null;
  protocol: string;
}

export interface IMongooseConfig extends IMongooseUrlScheme {
  name: string;
  password: string | undefined;
  url: string;
  username: string | undefined;
}

export interface IProcessEnv {
  [key: string]: string | undefined;
}

export interface IConfig {
  env: IEnvConfig;
  express: IExpressConfig;
  graphql: IGraphQLConfig;
  mongoose: IMongooseConfig;
}
