import createDebug, { Debugger } from 'debug';
import StackUtils from 'stack-utils';

import config from '@config';

type Logger = (...args: any[]) => void;
type LoggerWrapped = (logger: Logger) => (...args: any[]) => void;

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

const loggerWrapped: LoggerWrapped = logger => (...args) => {
  const logData: any =
    args[0] instanceof Error
      ? [
          `${args[0].message}\n${stack.clean(args[0].stack || '')}`,
          ...args.slice(1),
        ]
      : args;

  logger(...logData);
};

export const debug: Logger = (...args) => loggerWrapped(logDebug)(...args);
export const error: Logger = (...args) => loggerWrapped(logError)(...args);
export const http: Logger = (...args) => loggerWrapped(logHttp)(...args);
export const info: Logger = (...args) => loggerWrapped(logInfo)(...args);
export const warn: Logger = (...args) => loggerWrapped(logWarn)(...args);
