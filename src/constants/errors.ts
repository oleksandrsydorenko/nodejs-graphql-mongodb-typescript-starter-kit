import { IErrorMongoose, IErrorResponse } from '@ts';

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
