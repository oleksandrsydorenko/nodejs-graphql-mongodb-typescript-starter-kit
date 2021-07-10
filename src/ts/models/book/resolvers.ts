import { IAuthorDocument, IBookDocument, IResolver } from '@ts';

export interface IBookResolvers {
  Query: {
    book: IResolver<void, { title: string }, IBookDocument | null>;
    books: IResolver<void, void, IBookDocument[]>;
  };

  Mutation: {
    createBook: IResolver<
      void,
      { author: string; title: string },
      IBookDocument
    >;
    deleteBook: IResolver<
      void,
      { author: string; title: string },
      IBookDocument | null
    >;
    updateBook: IResolver<
      void,
      { author: string; title: string; update: { title: string } },
      IBookDocument | null
    >;
  };

  Book: {
    id: IResolver<IBookDocument, void, string>;
    author: IResolver<IBookDocument, void, IAuthorDocument | null>;
    title: IResolver<IBookDocument, void, string>;
  };
}
