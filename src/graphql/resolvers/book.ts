import { AuthorResponse, Book, BookResponse } from '@models';
import { IResolver } from '@loaders/apollo';

interface IBookResolvers {
  Query: {
    book: IResolver<void, { title: string }, BookResponse>;
    books: IResolver<void, void, Book[]>;
  };

  Mutation: {
    createBook: IResolver<void, { author: string; title: string }, BookResponse>;
    deleteBook: IResolver<void, { title: string }, boolean>;
    updateBook: IResolver<void, { title: string; data: { title: string } }, BookResponse>;
  };

  Book: {
    author: IResolver<Book, void, AuthorResponse>;
  };
}

const bookResolvers: IBookResolvers = {
  Query: {
    book: (_parent, { title }, { models }) => models.Book.findByTitle(title),
    books: (_parent, _args, { models }) => models.Book.findAll(),
  },

  Mutation: {
    createBook: (_parent, { author, title }, { models }) => {
      const authorFromDb: AuthorResponse = models.Author.findByName(author);

      if (!authorFromDb) {
        return null;
      }

      return models.Book.create(title, authorFromDb.id);
    },
    deleteBook: (_parent, { title }, { models }) => {
      const bookFromDb: BookResponse = models.Book.findByTitle(title);

      if (!bookFromDb) {
        return false;
      }

      const authorFromDb: AuthorResponse = models.Author.findById(bookFromDb.authorId);

      if (!authorFromDb) {
        return false;
      }

      models.Author.update(authorFromDb.name, {
        bookIds: authorFromDb.bookIds.filter(id => id !== bookFromDb.id),
      });

      return models.Book.delete(title);
    },
    updateBook: (_parent, { title, data }, { models }) => models.Book.update(title, data),
  },

  Book: {
    author: (book, _args, { models }) => models.Author.findById(book.authorId),
  },
};

export default bookResolvers;
