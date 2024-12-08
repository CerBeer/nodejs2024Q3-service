import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { LoggerService } from './logger/logger.service';
// import { CustomExceptionsFilter } from './logger/exceptions/exception.filter';
// import { addErrorListeners } from './logger/exceptions/exceptionListener';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  const filePath = join(__dirname, '..', 'doc', 'api.yaml');
  const file = await readFile(filePath, 'utf-8');
  const swaggerDocument = parse(file);
  SwaggerModule.setup('doc', app, swaggerDocument);

  // app.useGlobalFilters(new CustomExceptionsFilter(logger));

  // addErrorListeners(logger);
  await app.listen(PORT, () => console.log(`Server start on Port ${PORT}`));
}
bootstrap();
