import { IResolver } from '@ts';
import { IAuthorDocument } from './model';
import { IBookDocument } from '../book';

export interface IAuthorResolvers {
  Query: {
    author: IResolver<void, { name: string }, IAuthorDocument>;
    authors: IResolver<void, void, IAuthorDocument[]>;
  };

  Mutation: {
    createAuthor: IResolver<void, { name: string }, IAuthorDocument>;
    deleteAuthor: IResolver<void, { name: string }, IAuthorDocument>;
    updateAuthor: IResolver<
      void,
      { name: string; update: { name: string } },
      IAuthorDocument
    >;
  };

  Author: {
    books: IResolver<IAuthorDocument, void, IBookDocument[]>;
  };
}
