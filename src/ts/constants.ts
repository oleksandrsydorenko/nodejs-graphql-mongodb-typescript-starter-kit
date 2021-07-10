import { IError } from './base';

export interface IConfigDefault {
  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_PROTOCOL: string;
  readonly SERVER_HOST: string;
  readonly SERVER_PORT: number;
  readonly SERVER_PROTOCOL: string;
}

export interface IErrorMongoose {
  readonly DUPLICATE_KEY: number;
}

export interface IErrorResponse {
  readonly AUTHOR_EXISTS: IError;
  readonly AUTHOR_DOES_NOT_EXISTS: IError;
  readonly BOOK_EXISTS: IError;
  readonly BOOK_DOES_NOT_EXISTS: IError;
  readonly INTERNAL_SERVER_ERROR: IError;
}
