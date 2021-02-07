import { Application } from 'express';

import apolloLoader from './apollo';
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async (app: Application): Promise<void> => {
  apolloLoader(app);
  expressLoader(app);

  await mongooseLoader();
};
