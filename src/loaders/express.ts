import { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from '../routes';

interface IResponseError extends Error {
  statusCode?: number;
}

export default (app: Application) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(routes());
  // catching 404 error and forwarding next
  app.use((_req: Request, _res: Response, next) => {
    const error: IResponseError = new Error('Not Found');

    error.statusCode = 404;
    next(error);
  });
  // error handling middleware
  app.use((err: IResponseError, _req: Request, res: Response) => {
    res.status(err.statusCode || 500).send(err.message);
  });
};
