import type { Logger } from 'winston';

declare global {
  var nitroLogger: Logger;
}

export {};
