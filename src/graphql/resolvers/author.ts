import { Author, AuthorResponse, Book } from '@models';
import { IResolver } from '@loaders/apollo';

interface IAuthorResolvers {
  Query: {
    author: IResolver<void, { name: string }, AuthorResponse>;
    authors: IResolver<void, void, Author[]>;
  };

  Mutation: {
    createAuthor: IResolver<void, { name: string }, AuthorResponse>;
    deleteAuthor: IResolver<void, { name: string }, boolean>;
    updateAuthor: IResolver<void, { name: string; data: { name: string } }, AuthorResponse>;
  };

  Author: {
    books: IResolver<Book, void, Book[]>;
  };
}

const authorResolvers: IAuthorResolvers = {
  Query: {
    author: (_parent, { name }, { models }) => models.Author.findByName(name),
    authors: (_parent, _args, { models }) => models.Author.findAll(),
  },

  Mutation: {
    createAuthor: (_parent, { name }, { models }) => models.Author.create(name),
    deleteAuthor: (_parent, { name }, { models }) => {
      const authorFromDb: AuthorResponse = models.Author.findByName(name);

      if (!authorFromDb) {
        return false;
      }

      models.Book.deleteByAuthorId(authorFromDb.id);

      return models.Author.delete(name);
    },
    updateAuthor: (_parent, { name, data }, { models }) => models.Author.update(name, data),
  },

  Author: {
    books: (author, _args, { models }) => models.Book.filterByAuthorId(author.id),
  },
};

export default authorResolvers;
