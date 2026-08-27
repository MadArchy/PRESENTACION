export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(message: string, context?: any): void;
  info(message: string, context?: any): void;
  warn(message: string, context?: any): void;
  error(message: string, context?: any): void;
}

export class ConsoleLogger implements Logger {
  constructor(private readonly prefix = '[VentureHubOS]') {}

  debug(message: string, context?: any): void {
    if (context) {
      console.debug(`${this.prefix} [DEBUG] ${message}`, context);
    } else {
      console.debug(`${this.prefix} [DEBUG] ${message}`);
    }
  }

  info(message: string, context?: any): void {
    if (context) {
      console.info(`${this.prefix} [INFO] ${message}`, context);
    } else {
      console.info(`${this.prefix} [INFO] ${message}`);
    }
  }

  warn(message: string, context?: any): void {
    if (context) {
      console.warn(`${this.prefix} [WARN] ${message}`, context);
    } else {
      console.warn(`${this.prefix} [WARN] ${message}`);
    }
  }

  error(message: string, context?: any): void {
    if (context) {
      console.error(`${this.prefix} [ERROR] ${message}`, context);
    } else {
      console.error(`${this.prefix} [ERROR] ${message}`);
    }
  }
}

export const logger = new ConsoleLogger();
