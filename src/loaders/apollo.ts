import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

import config from '../config';
import { resolvers, typeDefs } from '../gql';

export default (app: Application) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app, path: config.apolloServer.path });
};
