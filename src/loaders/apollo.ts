import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import { makeExecutableSchema } from 'graphql-tools';

import config from '@config';
import { AuthorModel, BookModel } from '@models';
import { IContext } from '@ts';
import { resolvers, schema } from '@graphql';

const context: IContext = {
  models: {
    Author: AuthorModel,
    Book: BookModel,
  },
};

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    context,
    introspection: config.base.env.isDevelopment,
    playground: config.base.env.isDevelopment,
    schema: makeExecutableSchema({
      resolvers,
      schemaTransforms: [constraintDirective()],
      typeDefs: [constraintDirectiveTypeDefs, ...schema],
    }),
  });

  server.applyMiddleware({
    app,
    cors: {
      origin: config.graphql.origin,
    },
    path: config.graphql.path,
  });
};
