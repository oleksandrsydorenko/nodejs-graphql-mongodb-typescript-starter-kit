import { Application } from 'express';

import apolloLoader from './apollo';
import expressLoader from './express';

export default async (app: Application) => {
  apolloLoader(app);
  expressLoader(app);
};
