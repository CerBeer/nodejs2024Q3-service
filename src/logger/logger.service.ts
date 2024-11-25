import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile, mkdir, readdir, stat } from 'fs/promises';

const LOG_LEVELS = ['log', 'debug', 'error', 'verbose', 'warn'];
const LOG_LEVEL = parseInt(process.env.LOG_LEVEL || '4');
const LOG_FOLDER = process.env.LOG_FOLDER || 'logs';
const LOG_FILENAME_LOG = process.env.LOG_FILENAME_LOG || 'err.log';
const LOG_FILENAME_ERR = process.env.LOG_FILENAME_ERR || 'log.log';
const LOG_MAX_FILE_SIZE =
  parseInt(process.env.LOG_MAX_FILE_SIZE || '512') * 1024;

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logFolder = LOG_FOLDER;
  private logLevel = LOG_LEVEL;
  private logFileNameLog = LOG_FILENAME_LOG;
  private logFileNameErr = LOG_FILENAME_ERR;
  private logMaxFileSize = LOG_MAX_FILE_SIZE;

  private logFileLog = `${Math.round(Date.now() / 1000)}.${
    this.logFileNameLog
  }`;

  private logFileErr = `${Math.round(Date.now() / 1000)}.${
    this.logFileNameErr
  }`;

  constructor() {
    super();
  }

  private async checkLogFolder() {
    try {
      await readdir(this.logFolder);
    } catch (err) {
      await mkdir(this.logFolder, { recursive: true });
    }
  }

  private async checkSizeLog() {
    const target = `${this.logFolder}/${this.logFileLog}`;

    try {
      if (await this.fileExists(target)) {
        const { size } = await stat(target);
        if (size > this.logMaxFileSize) {
          this.logFileLog = `${Math.round(Date.now() / 1000)}.${
            this.logFileNameLog
          }`;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private async checkSizeErr() {
    const target = `${this.logFolder}/${this.logFileErr}`;

    try {
      if (await this.fileExists(target)) {
        const { size } = await stat(target);
        if (size > this.logMaxFileSize) {
          this.logFileErr = `${Math.round(Date.now() / 1000)}.${
            this.logFileNameErr
          }`;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private async writeLog(level: number, message: string) {
    await this.checkLogFolder();
    await this.checkSizeLog();

    const target = `${this.logFolder}/${this.logFileLog}`;
    const toWrite = `[${
      LOG_LEVELS[level]
    }] ${new Date().toISOString()} ${message}\n`;
    await appendFile(target, toWrite);
  }

  private async writeErr(message: string) {
    await this.checkLogFolder();
    await this.checkSizeErr();

    const target = `[error] ${this.logFolder}/${this.logFileErr}`;
    const toWrite = message + '\n';
    await appendFile(target, toWrite);
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await stat(filePath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw new Error(error);
    }
  }

  async log(message: string) {
    await this.writeLog(0, message);
    super.log(message);
  }

  async debug(message: any) {
    if (this.logLevel > 0) {
      await this.writeLog(1, message);
      super.debug(message);
    }
  }

  async error(message: any) {
    if (this.logLevel > 1) {
      await this.writeErr(message);
      super.error(message);
    }
  }

  async verbose(message: any) {
    if (this.logLevel === 2) {
      await this.writeLog(3, message);
      super.verbose(message);
    }
  }

  async warn(message: any) {
    if (this.logLevel > 3) {
      await this.writeLog(4, message);
      super.warn(message);
    }
  }
}
