import { IResolver } from '@ts';
import { IBookDocument } from './model';

export interface IBookResolvers {
  Query: {
    book: IResolver<void, { title: string }, IBookDocument>;
    books: IResolver<void, void, IBookDocument[]>;
  };

  Mutation: {
    createBook: IResolver<
      void,
      { author: string; title: string },
      IBookDocument
    >;
    deleteBook: IResolver<void, { title: string }, IBookDocument>;
    updateBook: IResolver<
      void,
      { title: string; update: { title: string } },
      IBookDocument
    >;
  };

  Book: {
    author: IResolver<IBookDocument, void, string>;
  };
}
