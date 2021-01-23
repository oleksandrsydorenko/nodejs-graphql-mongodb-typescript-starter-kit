import { gql } from 'apollo-server-express';

export default gql`
  type Book {
    author: Author
    title: String!
  }
`;
