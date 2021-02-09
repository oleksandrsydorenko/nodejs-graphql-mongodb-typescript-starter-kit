import express, { Application, Request, Response } from 'express';
import routes from '@routes';

interface IResponseError extends Error {
  statusCode?: number;
}

export default (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes());
  // catches 404 error and forwards it
  app.use((_req: Request, _res: Response, next): void => {
    const error: IResponseError = new Error('Not Found');

    error.statusCode = 404;
    next(error);
  });
  // handles errors
  app.use((err: IResponseError, _req: Request, res: Response): void => {
    res.status(err.statusCode || 500).send(err.message);
  });
};
