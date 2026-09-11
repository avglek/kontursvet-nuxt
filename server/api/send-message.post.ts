import { ILead } from '~~/shared/types/ILead';
import {
  cleanUpFiles,
  getMessage,
  markdownText,
  saveUploadedFiles,
  sendToBot,
  sendToEmail,
} from '../utils/messageService';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const isBotActive = String(config.botActive) === 'true';
  const isMailActive = String(config.smtpActive) === 'true';

  console.log('active:', isBotActive, isMailActive);
  try {
    const data = await readMultipartFormData(event);
    if (!data) {
      throw createError({ statusCode: 400, message: 'No data received' });
    }
    const message = getMessage(data);

    if (isBotActive) {
      const uniqueNames = await saveUploadedFiles(message.attachments);
      globalThis.nitroLogger.info('Отправка через MAX');

      await sendToBot(markdownText(message.text), uniqueNames);
      await cleanUpFiles(uniqueNames);
    }

    if (isMailActive) {
      globalThis.nitroLogger.info('Отправка через e-mail');
      const html = (await renderEmailComponent('MailOrder', {
        lead: message.text,
      })) as string;
      await sendToEmail(html, message.text.name, message.attachments);
    }

    return { success: true };
  } catch (error: any) {
    globalThis.nitroLogger.error('Внутреняя ошибка ', error);
    throw createError({ statusCode: 500, statusMessage: 'Внутреняя ошибка ' });
  }
});
