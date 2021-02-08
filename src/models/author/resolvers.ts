import { ApolloError } from 'apollo-server';

import { ERROR_MONGOOSE, ERROR_RESPONSE } from '@constants';
import { IAuthorDocument, IAuthorResolvers, IError } from '@ts';

const authorResolvers: IAuthorResolvers = {
  Query: {
    author: async (_parent, { name }, { models }) =>
      models.Author.findOne({ name }),
    authors: async (_parent, _args, { models }) => models.Author.find(),
  },

  Mutation: {
    createAuthor: async (_parent, { name }, { models }) => {
      const newAuthor: IAuthorDocument = new models.Author({
        name,
        bookIds: [],
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
    deleteAuthor: async (_parent, { name }, { models }) =>
      models.Author.findOneAndDelete({ name }),
    updateAuthor: async (_parent, { name, update }, { models }) =>
      models.Author.findOneAndUpdate({ name }, update),
  },

  Author: {
    books: async (author, _args, { models }) =>
      models.Book.find({ authorId: author._id }),
  },
};

export default authorResolvers;
