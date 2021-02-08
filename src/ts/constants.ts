import { IError } from './base';

export interface IConfigDefault {
  HOST: string;
}

export interface IErrorMongoose {
  DUPLICATE_KEY: number;
}

export interface IErrorResponse {
  AUTHOR_EXISTS: IError;
  AUTHOR_DOES_NOT_EXISTS: IError;
  BOOK_EXISTS: IError;
  BOOK_DOES_NOT_EXISTS: IError;
  INTERNAL_SERVER_ERROR: IError;
}
