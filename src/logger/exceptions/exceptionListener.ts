import { LoggerService } from 'src/logger/logger.service';

export const addErrorListeners = (logger: LoggerService): void => {
  process
    .on('unhandledRejection', async (event) => {
      logger.error(`Unhandled Rejection. ${event}`);
    })
    .on('uncaughtException', async (event) => {
      logger.error(`Uncaught Exception. ${event}`);
    });
};
