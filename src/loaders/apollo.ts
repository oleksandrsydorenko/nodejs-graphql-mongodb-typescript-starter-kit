import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { makeExecutableSchema } from 'graphql-tools';

import config from '@config';
import * as models from '@models';
import * as graphql from '@graphql';

interface ICorsOptions {
  origin: string[] | boolean;
}

const corsOptions: ICorsOptions = {
  origin: config.expressServer.allowedOrigins || false,
};

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    context: {
      models,
    },
    schema: makeExecutableSchema({
      resolvers: graphql.resolvers,
      schemaTransforms: [constraintDirective()],
      typeDefs: [constraintDirectiveTypeDefs, ...graphql.schema],
    }),
  });

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: config.apolloServer.path,
  });
};
