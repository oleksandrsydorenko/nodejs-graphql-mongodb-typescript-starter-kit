import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

import config from '../config';
import { resolvers, typeDefs } from '../graphql';

interface ICorsOptions {
  origin: string[] | boolean;
}

const corsOptions: ICorsOptions = {
  origin: config.expressServer.allowedOrigins || false,
};

export default (app: Application): void => {
  const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: config.apolloServer.path,
  });
};
