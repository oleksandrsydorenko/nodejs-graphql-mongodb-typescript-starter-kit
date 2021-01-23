import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    author: Author
    book: Book
  }
`;
