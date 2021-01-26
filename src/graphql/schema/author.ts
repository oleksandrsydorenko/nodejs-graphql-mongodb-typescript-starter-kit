import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    author(id: ID!): Author
    authors: [Author!]
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]
  }
`;
