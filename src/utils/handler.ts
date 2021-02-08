import { logError } from './logger';

// eslint-disable-next-line import/prefer-default-export
export const terminateProcess = (e?: Error): void => {
  if (e) {
    logError(e);
  }

  process.exit(1);
};
