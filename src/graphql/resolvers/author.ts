import { ApolloError } from 'apollo-server';

import { ERROR_MONGOOSE, ERROR_RESPONSE, IError } from '@utils';
import { IAuthorDocument, IBookDocument } from '@models';
import { IResolver } from '@loaders/apollo';

interface IAuthorResolvers {
  Query: {
    author: IResolver<void, { name: string }, IAuthorDocument>;
    authors: IResolver<void, void, IAuthorDocument[]>;
  };

  Mutation: {
    createAuthor: IResolver<void, { name: string }, IAuthorDocument>;
    deleteAuthor: IResolver<void, { name: string }, IAuthorDocument>;
    updateAuthor: IResolver<
      void,
      { name: string; update: { name: string } },
      IAuthorDocument
    >;
  };

  Author: {
    books: IResolver<IAuthorDocument, void, IBookDocument[]>;
  };
}

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
        const error: IError =
          e.code === ERROR_MONGOOSE.DUPLICATE_KEY
            ? ERROR_RESPONSE.AUTHOR_EXISTS
            : ERROR_RESPONSE.INTERNAL_SERVER_ERROR;

        throw new ApolloError(error.message, error.code);
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
