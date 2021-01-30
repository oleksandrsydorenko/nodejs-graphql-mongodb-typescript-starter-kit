import author from './author';
import book from './book';

const root = `
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export default [root, author, book];
