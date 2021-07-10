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
    book: async (_, args, context) =>
      context.models.Book.findOne({ title: args.title }),
    books: async (_, __, context) => context.models.Book.find(),
  },

  Mutation: {
    createBook: async (_, args, context) => {
      const authorFromDb: IAuthorDocument | null =
        await context.models.Author.findOne({
          name: args.author,
        });

      if (!authorFromDb) {
        throw getAuthorNotExistError();
      }

      const bookFromDb: IBookDocument | null =
        await context.models.Book.findOne({
          authorId: authorFromDb._id,
          title: args.title,
        });

      if (bookFromDb) {
        throw new ApolloError(
          ERROR_RESPONSE.BOOK_EXISTS.message,
          ERROR_RESPONSE.BOOK_EXISTS.code,
        );
      }

      const newBook: IBookDocument = new context.models.Book({
        authorId: authorFromDb._id,
        title: args.title,
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
    deleteBook: async (_, args, context) => {
      const authorFromDb: IAuthorDocument | null =
        await context.models.Author.findOne({
          name: args.author,
        });

      if (!authorFromDb) {
        throw getAuthorNotExistError();
      }

      return context.models.Book.findOneAndDelete({
        authorId: authorFromDb.id,
        title: args.title,
      });
    },
    updateBook: async (_, args, context) => {
      const authorFromDb: IAuthorDocument | null =
        await context.models.Author.findOne({
          name: args.author,
        });

      if (!authorFromDb) {
        throw getAuthorNotExistError();
      }

      return context.models.Book.findOneAndUpdate(
        {
          authorId: authorFromDb._id,
          title: args.title,
        },
        args.update,
      );
    },
  },

  Book: {
    id: parent => parent.id.toString(),
    author: async (parent, _, context) =>
      context.models.Author.findById(parent.authorId),
    title: parent => parent.title,
  },
};

export default bookResolvers;
