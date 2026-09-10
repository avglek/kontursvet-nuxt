import {
  cleanUpFiles,
  getMessage,
  saveUploadedFiles,
  sendToBot,
  sendToEmail,
} from '../utils/messageService';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const data = await readMultipartFormData(event);
    if (!data) {
      throw createError({ statusCode: 400, message: 'No data received' });
    }
    const message = getMessage(data);

    const html = (await renderEmailComponent('MailOrder', {
      lead: message.text,
    })) as string;

    if (config.botActive === 'true') {
      const uniqueNames = await saveUploadedFiles(message.attachments);
      await sendToBot(html, uniqueNames);
      await cleanUpFiles(uniqueNames);
    }

    if (config.smtpActive === 'true') {
      await sendToEmail(html, message.text.name, message.attachments);
    }

    return { success: true };
  } catch (error: any) {
    globalThis.nitroLogger.error('Внутреняя ошибка ', error);
    throw createError({ statusCode: 500, statusMessage: 'Внутреняя ошибка ' });
  }
});
