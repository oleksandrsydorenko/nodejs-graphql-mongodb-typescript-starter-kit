import { Router } from 'express';

import health from './health';

export default () => {
  const app = Router();

  health(app);

  return app;
};
