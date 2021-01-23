import { Router } from 'express';

import health from './health';

export default (): Router => {
  const app: Router = Router();

  // health monitoring endpoint
  health(app);

  return app;
};
