export interface AppError {
  timestamp: number;
  type: 'js' | 'gep' | 'storage' | 'other';
  message: string;
  stack?: string;
  context?: string;
}

const STORAGE_KEY = 'vw_error_log';
const MAX_ERRORS  = 100;

export class ErrorService {
  private static _instance: ErrorService;

  private constructor() {
    this.setupGlobalHandler();
  }

  static instance(): ErrorService {
    if (!ErrorService._instance) {
      ErrorService._instance = new ErrorService();
    }
    return ErrorService._instance;
  }

  private setupGlobalHandler(): void {
    window.onerror = (msg, src, line, col, err) => {
      this.log({
        timestamp: Date.now(),
        type: 'js',
        message: String(msg),
        stack: err?.stack,
        context: `${src}:${line}:${col}`
      });
      return false;
    };

    window.addEventListener('unhandledrejection', (evt) => {
      this.log({
        timestamp: Date.now(),
        type: 'js',
        message: `Unhandled rejection: ${evt.reason}`,
        stack: (evt.reason as Error)?.stack
      });
    });
  }

  log(error: AppError): void {
    console.error('[VisionWatch]', error);
    try {
      const errors = this.getErrors();
      errors.unshift(error);
      if (errors.length > MAX_ERRORS) errors.splice(MAX_ERRORS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(errors));
    } catch { /* storage full */ }
  }

  logGep(message: string, context?: string): void {
    this.log({ timestamp: Date.now(), type: 'gep', message, context });
  }

  logOther(message: string, context?: string): void {
    this.log({ timestamp: Date.now(), type: 'other', message, context });
  }

  getErrors(): AppError[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AppError[]) : [];
    } catch {
      return [];
    }
  }

  clearErrors(): void {
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
  }
}
