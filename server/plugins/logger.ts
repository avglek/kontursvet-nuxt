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

  // Настройка цветов для консоли
  const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };
  winston.addColors(colors);

  // Формат для консоли (красивый и читаемый)
  const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
    ),
  );

  const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  );

  // Создаем отдельный транспорт (файл) специально для критических падений
  const exceptionsTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: fileFormat,
  });

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
    // 🔥 АВТОМАТИЧЕСКИЙ ПЕРЕХВАТ НЕОБРАБОТАННЫХ ОШИБОК NODE.JS
    exceptionHandlers: [
      new winston.transports.Console({ format: consoleFormat }), // Дублировать в консоль
      exceptionsTransport, // Писать в специальный файл
    ],

    // 🔥 АВТОМАТИЧЕСКИЙ ПЕРЕХВАТ НЕОБРАБОТАННЫХ ПРОМИСОВ (async/await без try/catch)
    rejectionHandlers: [
      new winston.transports.Console({ format: consoleFormat }),
      exceptionsTransport,
    ],
  });

  // Делаем логгер доступным глобально в контексте Nitro
  globalThis.nitroLogger = logger;

  // Перехватываем стандартные логи сервера Nuxt/Nitro
  // nitroApp.hooks.hook('request', (event) => {
  //   logger.info(
  //     `Входящий запрос: ${event.node.req.method} ${event.node.req.url}`,
  //   );
  // });

  nitroApp.hooks.hook('error', (error, { event }) => {
    logger.error(`Ошибка сервера: ${error.message}`, {
      stack: error.stack,
      url: event?.node.req.url,
    });
  });
});
