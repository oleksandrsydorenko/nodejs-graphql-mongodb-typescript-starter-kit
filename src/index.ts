import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import './config';
import { resolvers, typeDefs } from './gql';

const app: Application = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server is on http://localhost:8000/graphql');
});
