export interface IBaseConfig {
  debugConfig: string;
  env: {
    isDevelopment: boolean;
    isProduction: boolean;
    type: string;
  };
}

export interface IApolloUrlScheme {
  path: string;
}

export interface IApolloConfig extends IApolloUrlScheme {
  cache: {
    isExtensionFormattingEnabled: boolean;
    isHttpHeadersAllowed: boolean;
    maxAge: number;
  };
  isIntrospectionEnabled: boolean;
  isPlaygroundEnabled: boolean;
  isTracingEnabled: boolean;
  origin: boolean | string | string[];
  query: {
    depth: {
      ignoreList: Array<string | RegExp | ((queryDepths: any[]) => boolean)>;
      max: number;
    };
  };
  url: string;
}

export interface IExpressUrlScheme {
  host: string;
  port: number | null;
  protocol: string;
}

export interface IExpressConfig extends IExpressUrlScheme {
  url: string;
}

export interface IMongooseUrlScheme {
  host: string;
  port: number | null;
  protocol: string;
}

export interface IMongooseConfig extends IMongooseUrlScheme {
  dbName: string;
  isCreateIndexEnabled: boolean;
  isErasingEnabled: boolean;
  isFindAndModifyEnabled: boolean;
  isNewUrlParserEnabled: boolean;
  isUnifiedTopologyEnabled: boolean;
  password: string | undefined;
  url: string;
  username: string | undefined;
}

export interface IProcessEnv {
  [key: string]: string | undefined;
}

export interface IConfig {
  base: IBaseConfig;
  apollo: IApolloConfig;
  express: IExpressConfig;
  mongoose: IMongooseConfig;
}
