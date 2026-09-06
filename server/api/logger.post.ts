export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { level, message, details, url } = body;

  const logMessage = `[Frontend] ${message} (URL: ${url || 'unknown'})`;

  console.log('log:', level, message, details);

  // Передаем в Winston на сервере в зависимости от уровня
  if (level === 'error') {
    globalThis.nitroLogger.error(logMessage, details);
  } else if (level === 'warn') {
    globalThis.nitroLogger.warn(logMessage, details);
  } else {
    globalThis.nitroLogger.info(logMessage, details);
  }

  return { success: true };
});
