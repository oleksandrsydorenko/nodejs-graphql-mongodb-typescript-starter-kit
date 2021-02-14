import depthLimit from 'graphql-depth-limit';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
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

const {
  cacheOptions,
  isIntrospectionEnabled,
  isPlaygroundEnabled,
  isTracingEnabled,
  maxDepth,
  origin,
  path,
} = config.apollo;

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    context,
    cacheControl: {
      calculateHttpHeaders: cacheOptions.isHttpHeadersAllowed,
      defaultMaxAge: cacheOptions.maxAge,
      // requirement of apollo server developers to explicitly set option to false it described cacheControl option
      // read https://github.com/apollographql/apollo-server/blob/main/packages/apollo-cache-control/src/index.ts
      stripFormattedExtensions: cacheOptions.isExtensionFormattingEnabled,
    },
    introspection: isIntrospectionEnabled,
    playground: isPlaygroundEnabled,
    plugins: [responseCachePlugin()],
    schema: makeExecutableSchema({
      resolvers,
      schemaTransforms: [constraintDirective()],
      typeDefs: [constraintDirectiveTypeDefs, ...schema],
    }),
    tracing: isTracingEnabled,
    validationRules: [depthLimit(maxDepth)],
  });

  server.applyMiddleware({
    app,
    path,
    cors: {
      origin,
    },
  });
};
