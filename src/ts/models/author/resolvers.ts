import { IAuthorDocument, IBookDocument, IResolver } from '@ts';

export interface IAuthorResolvers {
  Query: {
    author: IResolver<void, { name: string }, IAuthorDocument | null>;
    authors: IResolver<void, void, IAuthorDocument[]>;
  };

  Mutation: {
    createAuthor: IResolver<void, { name: string }, IAuthorDocument>;
    deleteAuthor: IResolver<void, { name: string }, IAuthorDocument | null>;
    updateAuthor: IResolver<
      void,
      { name: string; update: { name: string } },
      IAuthorDocument | null
    >;
  };

  Author: {
    books: IResolver<IAuthorDocument, void, IBookDocument[]>;
  };
}
