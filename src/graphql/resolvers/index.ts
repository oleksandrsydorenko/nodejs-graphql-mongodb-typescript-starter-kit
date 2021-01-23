import merge from 'deepmerge';
import { IResolvers } from 'apollo-server-express';

import author from './author';
import book from './book';

export default merge.all([author, book]) as IResolvers;
