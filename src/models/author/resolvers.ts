import { ApolloError } from 'apollo-server';

import { ERROR_MONGOOSE, ERROR_RESPONSE } from '@constants';
import { IAuthorDocument, IAuthorResolvers, IError } from '@ts';

const authorResolvers: IAuthorResolvers = {
  Query: {
    author: async (_, args, context) =>
      context.models.Author.findOne({ name: args.name }),
    authors: async (_, __, context) => context.models.Author.find(),
  },

  Mutation: {
    createAuthor: async (_, args, context) => {
      const newAuthor: IAuthorDocument = new context.models.Author({
        bookIds: [],
        name: args.name,
      });

      try {
        await newAuthor.save();

        return newAuthor;
      } catch (e) {
        const errorResponse: IError =
          e.code === ERROR_MONGOOSE.DUPLICATE_KEY
            ? ERROR_RESPONSE.AUTHOR_EXISTS
            : ERROR_RESPONSE.INTERNAL_SERVER_ERROR;

        throw new ApolloError(errorResponse.message, errorResponse.code);
      }
    },
    deleteAuthor: async (_, args, context) =>
      context.models.Author.findOneAndDelete({ name: args.name }),
    updateAuthor: async (_, args, context) =>
      context.models.Author.findOneAndUpdate({ name: args.name }, args.update),
  },

  Author: {
    id: parent => parent.id.toString(),
    books: async (parent, _, context) =>
      context.models.Book.find({ authorId: parent._id }),
    name: parent => parent.name,
  },
};

export default authorResolvers;
