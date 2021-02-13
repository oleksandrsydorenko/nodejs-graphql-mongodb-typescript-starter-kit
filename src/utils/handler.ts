import { error } from './logger';

// eslint-disable-next-line import/prefer-default-export
export const terminateProcess = (e?: Error): void => {
  if (e) {
    error(e);
  }

  process.exit(1);
};
