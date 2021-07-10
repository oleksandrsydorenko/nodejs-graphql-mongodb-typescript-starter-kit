export interface IBaseConfig {
  readonly debugConfig: string;
  readonly env: {
    readonly isDevelopment: boolean;
    readonly isProduction: boolean;
    readonly type: string;
  };
}

export interface IApolloUrlScheme {
  readonly path: string;
}

export interface IApolloConfig extends IApolloUrlScheme {
  readonly cache: {
    readonly isExtensionFormattingEnabled: boolean;
    readonly isHttpHeadersAllowed: boolean;
    readonly maxAge: number;
  };
  readonly isDebugEnabled: boolean;
  readonly isIntrospectionEnabled: boolean;
  readonly isPlaygroundEnabled: boolean;
  readonly isTracingEnabled: boolean;
  readonly origin: boolean | string | string[];
  readonly query: {
    readonly depth: {
      readonly ignoreList: Array<
        string | RegExp | ((queryDepths: any[]) => boolean)
      >;
      readonly max: number;
    };
  };
  readonly url: string;
}

export interface IExpressUrlScheme {
  readonly host: string;
  readonly port: number | null;
  readonly protocol: string;
}

export interface IExpressConfig extends IExpressUrlScheme {
  readonly url: string;
}

export interface IMongooseUrlScheme {
  readonly host: string;
  readonly port: number | null;
  readonly protocol: string;
}

export interface IMongooseConfig extends IMongooseUrlScheme {
  readonly dbName: string;
  readonly isCreateIndexEnabled: boolean;
  readonly isErasingEnabled: boolean;
  readonly isFindAndModifyEnabled: boolean;
  readonly isNewUrlParserEnabled: boolean;
  readonly isUnifiedTopologyEnabled: boolean;
  readonly password: string | undefined;
  readonly url: string;
  readonly username: string | undefined;
}

export interface IProcessEnv {
  readonly [key: string]: string | undefined;
}

export interface IConfig {
  readonly base: IBaseConfig;
  readonly apollo: IApolloConfig;
  readonly express: IExpressConfig;
  readonly mongoose: IMongooseConfig;
}
