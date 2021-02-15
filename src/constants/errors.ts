import { IErrorMongoose, IErrorResponse } from '@ts';

export const ERROR_MONGOOSE: IErrorMongoose = {
  DUPLICATE_KEY: 11000,
};

export const ERROR_RESPONSE: IErrorResponse = {
  AUTHOR_EXISTS: {
    code: 'AUTHOR_EXISTS',
    message: 'Author with provided name already exists',
  },
  AUTHOR_DOES_NOT_EXISTS: {
    code: 'AUTHOR_DOES_NOT_EXIST',
    message: 'Author with provided name does not exist',
  },
  BOOK_EXISTS: {
    code: 'BOOK_EXISTS',
    message: 'Book with provided author already exists',
  },
  BOOK_DOES_NOT_EXISTS: {
    code: 'BOOK_DOES_NOT_EXIST',
    message: 'Book with provided author does not exist',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
};
