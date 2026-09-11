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
    if (!file.filename || !file.data) continue;

    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${file.filename}`;
    const filePath = path.join(uploadDir, uniqueName);

    await fs.writeFile(filePath, file.data);
    savedPaths.push(filePath);
  }

  return savedPaths;
}

export async function sendToBot(
  messageHtml: string,
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

    const response = await bot.api.sendMessageToChat(chatId, messageHtml, {
      format: 'html',
      attachments: photos,
    });
    globalThis.nitroLogger.info('Сообщение отправлено:', response);
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
      throw createError({
        message: `Ошибка удаления файла ${filePath}:${error.message}`,
      });
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
        data: part.data,
        fileType: part.type,
      });
    }
  }

  return { text: lead as ILead, attachments };
}
