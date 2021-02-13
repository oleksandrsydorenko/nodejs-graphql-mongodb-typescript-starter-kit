import createDebug, { Debugger } from 'debug';
import StackUtils from 'stack-utils';

import config from '@config';

type Logger = (message: any) => void;

const logDebug: Debugger = createDebug('debug');
const logError: Debugger = createDebug('error');
const logHttp: Debugger = createDebug('http');
const logInfo: Debugger = createDebug('info');
const logWarn: Debugger = createDebug('warn');

createDebug.enable(config.base.debugConfig);

// blue
logDebug.color = '4';
// red
logError.color = '1';
// magenta
logHttp.color = '5';
// green
logInfo.color = '2';
// orange
logWarn.color = '3';

const stack: StackUtils = new StackUtils({
  cwd: process.cwd(),
  internals: StackUtils.nodeInternals(),
});

const convertErrorToString = (input: any): string =>
  input instanceof Error
    ? `${input.message}\n${stack.clean(input.stack || '')}`
    : JSON.stringify(input);

export const debug: Logger = message => logDebug(convertErrorToString(message));
export const error: Logger = message => logError(convertErrorToString(message));
export const http: Logger = message => logHttp(message);
export const info: Logger = message => logInfo(message);
export const warn: Logger = message => logWarn(message);
