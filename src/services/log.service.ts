export class LogService {
  private static isDevelopment = import.meta.env.MODE === 'development';

  static log(...args: any[]): void {
    if (this.isDevelopment) {
      console.log(...args);
    }
  }

  static error(...args: any[]): void {
    if (this.isDevelopment) {
      console.error(...args);
    }
  }

  static warn(...args: any[]): void {
    if (this.isDevelopment) {
      console.warn(...args);
    }
  }

  static info(...args: any[]): void {
    if (this.isDevelopment) {
      console.info(...args);
    }
  }
}