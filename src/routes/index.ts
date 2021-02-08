import { Router } from 'express';

import health from './health';

export default (): Router => {
  const app: Router = Router();

  health(app);

  return app;
};
