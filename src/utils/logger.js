/**
 * Logger utility for consistent logging across the application
 */
class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data })
    };
    return JSON.stringify(logEntry);
  }

  info(message, data = null) {
    console.log(this.formatMessage('INFO', message, data));
  }

  error(message, error = null) {
    const errorData = error ? {
      message: error.message,
      stack: this.isDevelopment ? error.stack : undefined,
      ...(error.statusCode && { statusCode: error.statusCode }),
      ...(error.errorCode && { errorCode: error.errorCode })
    } : null;
    console.error(this.formatMessage('ERROR', message, errorData));
  }

  warn(message, data = null) {
    console.warn(this.formatMessage('WARN', message, data));
  }

  debug(message, data = null) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('DEBUG', message, data));
    }
  }
}

export const logger = new Logger();

