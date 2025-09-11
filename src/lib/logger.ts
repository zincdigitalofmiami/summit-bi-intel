/**
 * Logging utility for the application
 * Provides structured logging with different levels and environment-aware behavior
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isBrowser = typeof window !== 'undefined';

  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
    return data ? `${prefix} ${message}` : `${prefix} ${message}`;
  }

  private log(level: LogLevel, message: string, data?: unknown, _context?: string) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, data);

    switch (level) {
      case 'debug':
         
        console.debug(formattedMessage, data);
        break;
      case 'info':
         
        console.info(formattedMessage, data);
        break;
      case 'warn':
         
        console.warn(formattedMessage, data);
        break;
      case 'error':
         
        console.error(formattedMessage, data);
        break;
    }

    // In production, send critical errors to server logging API
    if (!this.isDevelopment && level === 'error') {
      this.sendToMonitoringService({ level, message, data, context: _context });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.isDevelopment) {
      // In production, only log errors and warnings
      return level === 'error' || level === 'warn';
    }
    return true;
  }

  debug(message: string, data?: unknown, _context?: string) {
    this.log('debug', message, data, _context);
  }

  info(message: string, data?: unknown, _context?: string) {
    this.log('info', message, data, _context);
  }

  warn(message: string, data?: unknown, _context?: string) {
    this.log('warn', message, data, _context);
  }

  error(message: string, data?: unknown, _context?: string) {
    this.log('error', message, data, _context);
  }

  private async sendToMonitoringService(logData: { level: LogLevel; message: string; data?: unknown; context?: string }) {
    // Framework for error monitoring integration
    // Replace with actual monitoring service implementation (Sentry, LogRocket, etc.)

    try {
      // Example: Sentry integration
      // if (typeof window !== 'undefined' && window.Sentry) {
      //   window.Sentry.captureException(new Error(logData.message), {
      //     tags: { level: logData.level, context: logData.context },
      //     extra: logData.data
      //   });
      // }

      // Send to server API (best-effort)
      if (typeof window !== 'undefined' && logData.level === 'error') {
        try {
          await fetch('/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...logData,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              url: window.location.href,
            }),
            keepalive: true,
          });
        } catch {
          // swallow errors
        }
      }
    } catch (monitoringError) {
      // Silent fail for monitoring to avoid infinite loops
       
      console.error('Error monitoring service failed:', monitoringError);
    }
  }
}

export const logger = new Logger();
