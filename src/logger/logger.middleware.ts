import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService();

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl, body, query } = request;
    const userAgent = request.get('user-agent') || '';
    const requestDate = new Date().toISOString();
    const logMessage = `${requestDate} REQ: ${method} ${originalUrl} ${JSON.stringify(
      query,
    )} ${JSON.stringify(body)}`;
    this.logger.log(logMessage);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const responseDate = new Date().toISOString();
      this.logger.log(
        `${responseDate} RES: ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      if (statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (statusCode >= 400 && response.statusCode < 500) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });
    next();
  }
}
