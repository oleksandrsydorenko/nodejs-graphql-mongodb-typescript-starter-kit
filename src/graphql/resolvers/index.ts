import { IResolvers } from 'apollo-server-express';

import author from './author';
import book from './book';

export default [author, book] as IResolvers;
