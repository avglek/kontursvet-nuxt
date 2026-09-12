import fs from 'node:fs/promises';
import path from 'node:path';
import type { MultiPartData } from 'h3';
import nodemailer from 'nodemailer';
import { ILead, ILeadAttachment, ILeadMessage } from '~~/shared/types/ILead';
import { Bot } from '@maxhub/max-bot-api';
import { fetch as undiciFetch, Agent } from 'undici';

const config = useRuntimeConfig();

export async function saveUploadedFiles(
  files: ILeadAttachment[],
): Promise<string[]> {
  const uploadDir = path.resolve(process.cwd(), 'tmp/uploads');
  const savedPaths: string[] = [];

  await fs.mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    if (!file.filename || !file.content) continue;

    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${file.filename}`;
    const filePath = path.join(uploadDir, uniqueName);

    await fs.writeFile(filePath, file.content);
    savedPaths.push(filePath);
  }

  return savedPaths;
}

export async function sendToBot(
  messageText: string,
  uniquePatch: string[],
): Promise<void> {
  globalThis.nitroLogger.info(
    `[Бот] Отправка сообщения  с ${uniquePatch.length} файлами.`,
  );

  const certPath = path.resolve(process.cwd(), config.nodeSslCerts);
  const caCert = await fs.readFile(certPath);

  const customDispatcher = new Agent({
    connect: {
      ca: [caCert],
    },
  });

  const customFetch = (input: any, init?: any) => {
    return undiciFetch(input, {
      ...init,
      dispatcher: customDispatcher,
    });
  };

  const bot = new Bot(config.botToken, {
    clientOptions: {
      fetch: customFetch as any,
    },
  });

  const chatId = Number.parseInt(config.chatId);

  try {
    const photos = [];

    for (const path of uniquePatch) {
      const photo = await bot.api.uploadImage({ source: path });
      photos.push(photo.toJson());
    }

    await bot.api.sendMessageToChat(chatId, messageText, {
      format: 'markdown',
      attachments: photos,
    });
    globalThis.nitroLogger.info('Сообщение отправлено.');
  } catch (error: any) {
    throw createError({
      message: `Ошибка отправки в мессаджер Max:${error.message}`,
    });
  }
}

export async function sendToEmail(
  html: string,
  from: string,
  attachments: ILeadAttachment[],
): Promise<void> {
  globalThis.nitroLogger.info(
    `[Email] Дублирование сообщения на почту с ${attachments.length} вложениями.`,
  );

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  try {
    const sendInfo = await transporter.sendMail({
      from: config.smtpFrom,
      to: config.smtpTo,
      subject: `Заявка от ${from}`,
      attachments,
      html,
    });
    globalThis.nitroLogger.info(
      `Сообщение отправлено, ответ от сервера: ${sendInfo.response}`,
    );
  } catch (error: any) {
    throw createError({
      message: `Ошибка отправки по e-mail:${error.message}`,
    });
  }
}

export async function cleanUpFiles(filePaths: string[]): Promise<void> {
  for (const filePath of filePaths) {
    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      globalThis.nitroLogger?.error(
        `Ошибка удаления файла ${filePath}:`,
        error,
      );
    }
  }
}

export function getMessage(parts: MultiPartData[]): ILeadMessage {
  const attachments: ILeadAttachment[] = [];
  let lead: Partial<ILead> = {};
  for (const part of parts) {
    if (part.name === 'json') {
      const jsonString = part.data.toString();
      lead = <ILead>JSON.parse(jsonString);
    }
    if (part.name === 'files' && part.filename) {
      attachments.push({
        filename: part.filename,
        content: part.data,
        contentType: part.type,
        encoding: 'base64',
      });
    }
  }

  return { text: lead as ILead, attachments };
}

export function markdownText(lead: ILead): string {
  let text = `
    **Заказчик:** ${lead.name}
    **телефон:** [${lead.phone.format}](tel:${lead.phone.digital})
    `;
  if (lead.home) text += `**тип объекта:** ${lead.home}\n`;
  if (lead.location) text += `**где находится:** ${lead.location}\n`;
  if (lead.message) text += `**Коротко о задаче:** ${lead.message}\n`;

  return text;
}
