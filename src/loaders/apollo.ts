import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import { makeExecutableSchema } from 'graphql-tools';

import config from '@config';
import * as models from '@models';
import * as graphql from '@graphql';
import { IContext } from '@ts';

const context: IContext = {
  models: {
    Author: models.AuthorModel,
    Book: models.BookModel,
  },
};

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    context,
    introspection: config.env.isDevelopment,
    playground: config.env.isDevelopment,
    schema: makeExecutableSchema({
      resolvers: graphql.resolvers,
      schemaTransforms: [constraintDirective()],
      typeDefs: [constraintDirectiveTypeDefs, ...graphql.schema],
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
