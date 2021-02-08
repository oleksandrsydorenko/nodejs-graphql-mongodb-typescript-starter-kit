import { authorSchema, bookSchema } from '@models';

const root: string = `
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export default [root, authorSchema, bookSchema];
