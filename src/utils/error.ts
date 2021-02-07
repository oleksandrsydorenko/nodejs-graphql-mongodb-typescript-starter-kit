import { logError } from './logger';

export interface IError {
  code: string;
  message: string;
}

interface IErrorMongoose {
  DUPLICATE_KEY: number;
}

interface IErrorResponse {
  AUTHOR_EXISTS: IError;
  AUTHOR_DOES_NOT_EXISTS: IError;
  BOOK_EXISTS: IError;
  BOOK_DOES_NOT_EXISTS: IError;
  INTERNAL_SERVER_ERROR: IError;
}

export const ERROR_MONGOOSE: IErrorMongoose = {
  DUPLICATE_KEY: 11000,
};

export const ERROR_RESPONSE: IErrorResponse = {
  AUTHOR_EXISTS: {
    code: 'AUTHOR_EXISTS',
    message: 'Author already exists',
  },
  AUTHOR_DOES_NOT_EXISTS: {
    code: 'AUTHOR_DOES_NOT_EXIST',
    message: 'Author does not exist',
  },
  BOOK_EXISTS: {
    code: 'BOOK_EXISTS',
    message: 'Book already exists',
  },
  BOOK_DOES_NOT_EXISTS: {
    code: 'BOOK_DOES_NOT_EXIST',
    message: 'Book does not exist',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
};

export const terminateProcess = (e?: Error): void => {
  if (e) {
    logError(e);
  }

  process.exit(1);
};
