import { authorSchema, bookSchema } from '@models';

import directivesSchema from './directives.graphql';
import rootSchema from './root.graphql';

export default [directivesSchema, rootSchema, authorSchema, bookSchema];
