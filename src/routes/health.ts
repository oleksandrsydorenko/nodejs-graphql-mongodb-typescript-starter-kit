import { Router, Request, Response } from 'express';

export default (app: Router): void => {
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).end();
  });
};
