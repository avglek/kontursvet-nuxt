import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const fileName = query.file;
  const filePath = path.join(
    process.cwd(),
    'server',
    'data',
    <string>fileName?.valueOf(),
  );

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Ошибка чтения каталога:', error);
    return []; // Возвращаем пустой массив, чтобы v-for не падал с ошибкой
  }
});
