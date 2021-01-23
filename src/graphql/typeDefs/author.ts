import { gql } from 'apollo-server-express';

export default gql`
  type Author {
    name: String!
    books: [Book]
  }
`;
