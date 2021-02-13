import { authorSchema, bookSchema } from '@models';
import directives from './directives';

const root: string = `
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export default [...directives, root, authorSchema, bookSchema];
