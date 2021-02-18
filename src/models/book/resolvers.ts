import { ApolloError } from 'apollo-server';

import { ERROR_RESPONSE } from '@constants';
import { IAuthorDocument, IBookDocument, IBookResolvers } from '@ts';

const getAuthorNotExistError = (): ApolloError =>
  new ApolloError(
    ERROR_RESPONSE.AUTHOR_DOES_NOT_EXISTS.message,
    ERROR_RESPONSE.AUTHOR_DOES_NOT_EXISTS.code,
  );

const bookResolvers: IBookResolvers = {
  Query: {
    book: async (_parent, { title }, { models }) =>
      models.Book.findOne({ title }),
    books: async (_parent, _args, { models }) => models.Book.find(),
  },

  Mutation: {
    createBook: async (_parent, { author, title }, { models }) => {
      const authorFromDb: IAuthorDocument | null = await models.Author.findOne({
        name: author,
      });

      if (!authorFromDb) {
        throw getAuthorNotExistError();
      }

      const bookFromDb: IBookDocument | null = await models.Book.findOne({
        title,
        authorId: authorFromDb._id,
      });

      if (bookFromDb) {
        throw new ApolloError(
          ERROR_RESPONSE.BOOK_EXISTS.message,
          ERROR_RESPONSE.BOOK_EXISTS.code,
        );
      }

      const newBook: IBookDocument = new models.Book({
        title,
        authorId: authorFromDb._id,
      });

      try {
        await newBook.save();
      } catch (e) {
        throw new ApolloError(
          ERROR_RESPONSE.INTERNAL_SERVER_ERROR.message,
          ERROR_RESPONSE.INTERNAL_SERVER_ERROR.code,
        );
      }

      authorFromDb.bookIds.push(newBook._id);
      await authorFromDb.save();

      return newBook;
    },
    deleteBook: async (_parent, { author, title }, { models }) => {
      const authorFromDb: IAuthorDocument | null = await models.Author.findOne({
        name: author,
      });

      if (!authorFromDb) {
        throw getAuthorNotExistError();
      }

      return models.Book.findOneAndDelete({
        title,
        authorId: authorFromDb._id.toString(),
      });
    },
    updateBook: async (_parent, { author, title, update }, { models }) => {
      const authorFromDb: IAuthorDocument | null = await models.Author.findOne({
        name: author,
      });

      if (!authorFromDb) {
        throw getAuthorNotExistError();
      }

      return models.Book.findOneAndUpdate(
        { title, authorId: authorFromDb._id },
        update,
      );
    },
  },

  Book: {
    author: async (book, _args, { models }) =>
      models.Author.findById(book.authorId),
  },
};

export default bookResolvers;
