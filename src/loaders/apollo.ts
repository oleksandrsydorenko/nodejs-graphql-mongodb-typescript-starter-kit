import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { makeExecutableSchema } from 'graphql-tools';

import config from '@config';
import * as models from '@models';
import * as graphql from '@graphql';

interface IContext {
  models: {
    Author: models.IAuthorModel;
    Book: models.IBookModel;
  };
}

export type IResolver<TParent, TArgs, TResponse> = (
  parent: TParent,
  args: TArgs,
  context: IContext,
) => TResponse;

const context: IContext = {
  models: {
    Author: models.AuthorModel,
    Book: models.BookModel,
  },
};

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    context,
    schema: makeExecutableSchema({
      resolvers: graphql.resolvers,
      schemaTransforms: [constraintDirective()],
      typeDefs: [constraintDirectiveTypeDefs, ...graphql.schema],
    }),
  });

  server.applyMiddleware({
    app,
    cors: {
      origin: config.expressServer.allowedOrigins || false,
    },
    path: config.apolloServer.path,
  });
};
