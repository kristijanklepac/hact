import { httpTerminator, server } from './index';
import Logger from './logger';

class ExitHandler {
  public async handleExit(code: number, timeout = 5000): Promise<void> {
    try {
      Logger.info(`Attempting a graceful shutdown with code ${code}`);

      setTimeout(() => {
        Logger.info(`Forcing a shutdown with code ${code}`);
        process.exit(code);
      }, timeout).unref();

      if (server.listening) {
        Logger.info('Terminating HTTP connections');
        await httpTerminator.terminate();
      }

      Logger.info(`Exiting gracefully with code ${code}`);
      process.exit(code);
    } catch (error) {
      Logger.error('Error shutting down gracefully');
      Logger.error(error);
      Logger.info(`Forcing exit with code ${code}`);
      process.exit(code);
    }
  }
}

export const exitHandler = new ExitHandler();
