import { ApolloError } from 'apollo-server';

import { ERROR_MONGOOSE, ERROR_RESPONSE } from '@constants';
import { IAuthorDocument, IBookDocument, IError, IResolver } from '@ts';

interface IBookResolvers {
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

const bookResolvers: IBookResolvers = {
  Query: {
    book: async (_parent, { title }, { models }) =>
      models.Book.findOne({ title }),
    books: async (_parent, _args, { models }) => models.Book.find(),
  },

  Mutation: {
    createBook: async (_parent, { author, title }, { models }) => {
      const authorFromDb: IAuthorDocument = await models.Author.findOne({
        name: author,
      });

      if (!authorFromDb) {
        throw new ApolloError(
          ERROR_RESPONSE.AUTHOR_DOES_NOT_EXISTS.message,
          ERROR_RESPONSE.AUTHOR_DOES_NOT_EXISTS.code,
        );
      }

      const newBook: IBookDocument = new models.Book({
        title,
        authorId: authorFromDb._id,
      });

      try {
        await newBook.save();
      } catch (e) {
        const error: IError =
          e.code === ERROR_MONGOOSE.DUPLICATE_KEY
            ? ERROR_RESPONSE.BOOK_EXISTS
            : ERROR_RESPONSE.INTERNAL_SERVER_ERROR;

        throw new ApolloError(error.message, error.code);
      }

      authorFromDb.bookIds.push(newBook._id);
      await authorFromDb.save();

      return newBook;
    },
    deleteBook: async (_parent, { title }, { models }) =>
      models.Book.findOneAndDelete({ title }),
    updateBook: async (_parent, { title, update }, { models }) =>
      models.Book.findOneAndUpdate({ title }, update),
  },

  Book: {
    author: async (book, _args, { models }) =>
      models.Author.findById(book.authorId),
  },
};

export default bookResolvers;
