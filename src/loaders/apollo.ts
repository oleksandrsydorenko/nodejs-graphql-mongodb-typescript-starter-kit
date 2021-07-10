import depthLimitRule from 'graphql-depth-limit';
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
import { log } from '@utils';
import { resolvers, schema } from '@graphql';

interface IQueryDepth {
  operation: string;
  depth: number;
}

const context: IContext = {
  models: {
    Author: AuthorModel,
    Book: BookModel,
  },
};

const {
  cache,
  isDebugEnabled,
  isIntrospectionEnabled,
  isPlaygroundEnabled,
  isTracingEnabled,
  origin,
  path,
  query,
} = config.apollo;

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    context,
    cacheControl: {
      calculateHttpHeaders: cache.isHttpHeadersAllowed,
      defaultMaxAge: cache.maxAge,
      // https://github.com/apollographql/apollo-server/blob/main/packages/apollo-cache-control/src/index.ts#L165
      stripFormattedExtensions: cache.isExtensionFormattingEnabled,
    },
    debug: isDebugEnabled,
    introspection: isIntrospectionEnabled,
    playground: isPlaygroundEnabled,
    plugins: [responseCachePlugin()],
    schema: makeExecutableSchema({
      resolvers,
      schemaTransforms: [constraintDirective()],
      typeDefs: [constraintDirectiveTypeDefs, ...schema],
    }),
    tracing: isTracingEnabled,
    validationRules: [
      depthLimitRule(
        query.depth.max,
        { ignore: query.depth.ignoreList },
        (queryDepth: IQueryDepth) => {
          if (!config.base.env.isDevelopment) {
            return;
          }

          const [operation, depth]: [string, number] =
            Object.entries(queryDepth)[0];
          const queryName = operation || 'Query';

          if (Number.isNaN(depth)) {
            log.http(
              "'%s' exceeds max depth of %d",
              queryName,
              query.depth.max,
            );
          } else {
            log.http("'%s' has depth of %d", queryName, depth);
          }
        },
      ),
    ],
  });

  server.applyMiddleware({
    app,
    path,
    cors: {
      origin,
    },
  });
};
