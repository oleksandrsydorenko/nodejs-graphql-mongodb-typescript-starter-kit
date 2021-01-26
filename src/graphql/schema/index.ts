import { gql } from 'apollo-server-express';

import author from './author';
import book from './book';

const root = gql`
  type Query {
    _: String
  }
`;

export default [root, author, book];
