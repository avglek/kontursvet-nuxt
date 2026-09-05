import winston from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

export default defineNitroPlugin((nitroApp) => {
  // Настройка кастомного формата (похожего на log4j PatternLayout)
  const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
      return `[${timestamp}] [${level.toUpperCase()}] - ${message} ${metaString}`;
    }),
  );

  //   // Настройка ротации файлов
  //   const fileTransport = new winston.transports.DailyRotateFile({
  //     dirname: path.resolve(process.cwd(), 'logs'),
  //     filename: 'application-%DATE%.log',
  //     datePattern: 'YYYY-MM-DD',
  //     zippedArchive: true, // Архивовровать старые логи в .gz
  //     maxSize: '20m', // Ротация при достижении 20 Мегабайт
  //     maxFiles: '14d', // Хранить логи за последние 14 дней
  //     level: 'info',
  //   });

  //   const logger = winston.createLogger({
  //     transports: [
  //       new DailyRotateFile({
  //         filename: 'application-%DATE%.log',
  //         datePattern: 'YYYY-MM-DD-HH',
  //         maxSize: '20m',
  //         maxFiles: '14d',
  //       }),
  //     ],
  //   });

  const logger = winston.createLogger({
    format: logFormat,
    transports: [
      new DailyRotateFile({
        dirname: path.resolve(process.cwd(), 'logs'),
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true, // Архивовровать старые логи в .gz
        maxSize: '20m', // Ротация при достижении 20 Мегабайт
        maxFiles: '14d', // Хранить логи за последние 14 дней
        level: 'info',
      }),
      // Дублируем в консоль разработчика в non-production средах
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), logFormat),
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      }),
    ],
  });

  // Делаем логгер доступным глобально в контексте Nitro
  globalThis.nitroLogger = logger;

  // Перехватываем стандартные логи сервера Nuxt/Nitro
  nitroApp.hooks.hook('request', (event) => {
    logger.info(
      `Входящий запрос: ${event.node.req.method} ${event.node.req.url}`,
    );
  });

  nitroApp.hooks.hook('error', (error, { event }) => {
    logger.error(`Ошибка сервера: ${error.message}`, {
      stack: error.stack,
      url: event?.node.req.url,
    });
  });
});
