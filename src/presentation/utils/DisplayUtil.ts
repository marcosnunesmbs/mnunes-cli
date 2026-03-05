export enum LogLevel {
  SUCCESS = '\x1b[32m',   // Green
  ERROR = '\x1b[31m',     // Red
  WARNING = '\x1b[33m',   // Orange/Yellow
  INFO = '\x1b[36m',      // Cyan
  RESET = '\x1b[0m',      // Reset
}

export class DisplayUtil {
  static success(message: string): void {
    console.log(`${LogLevel.SUCCESS}${message}${LogLevel.RESET}`);
  }

  static error(message: string): void {
    console.log(`${LogLevel.ERROR}${message}${LogLevel.RESET}`);
  }

  static warning(message: string): void {
    console.log(`${LogLevel.WARNING}${message}${LogLevel.RESET}`);
  }

  static info(message: string): void {
    console.log(`${LogLevel.INFO}${message}${LogLevel.RESET}`);
  }

  static log(message: string): void {
    console.log(message);
  }
}