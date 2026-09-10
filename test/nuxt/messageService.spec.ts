//declare var renderEmailComponent: any;

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getMessage,
  saveUploadedFiles,
  sendToEmail,
  //   cleanUpFiles,
} from '../../server/utils/messageService';
import fs from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { Bot } from '@maxhub/max-bot-api';

import type { MultiPartData } from 'h3';
import type {
  ILead,
  ILeadAttachment,
  ILeadMessage,
} from '../../shared/types/ILead';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(),
  },
}));

vi.mock('node:fs/promises', () => ({
  default: {
    mkdir: vi.fn().mockResolvedValue(undefined),
    writeFile: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn().mockResolvedValue(undefined),
  },
  mkdir: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
  readFile: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@maxhub/max-bot-api');

vi.stubGlobal('useRuntimeConfig', () => ({
  mail: {
    host: '://test.com',
    port: 465,
    user: 'test@test.com',
    pass: 'password',
    from: 'test@test.com',
    to: 'manager@test.com',
  },
}));

vi.stubGlobal('nitroLogger', {
  info: vi.fn(), // пустая функция-заглушка
  warn: vi.fn(),
  error: vi.fn(),
});

const mockMessageText = `{
        "name": "Дмитрий",  
        "phone": "+7(911)240-11-11",
        "home": "Частный дом",
        "message": "Оформить основной дом и зону барбекю в едином стиле, поддержать ту же цветовую гамму на деревьях и выделить ёлку.",
        "location": "Колпино"}`;

describe('Message Service (Unit Tests)', () => {
  beforeEach(() => {
    // Сбрасываем счетчики вызовов моков перед каждым тестом
    vi.clearAllMocks();
  });

  describe('getMessage', () => {
    it('преобразовать в тип ILeadMessage', async () => {
      const parts: MultiPartData[] = [
        {
          name: 'files',
          filename: '001.webp', // Оригинальное имя файла
          type: 'image/webp', // MIME-тип файла
          data: await fs.readFile('./public/images/home/001.webp'),
        },
        {
          name: 'json',
          data: Buffer.from(mockMessageText),
        },
      ];

      const message = getMessage(parts);
      expect(message.text.name).toBe('Дмитрий');
      expect(message.attachments[0]?.filename).toBe('001.webp');
    });
  });

  describe('saveUploadedFiles', () => {
    it('должна успешно сохранить валидные файлы на диск', async () => {
      // Имитируем успешное создание папки и запись файла
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const mockFiles: ILeadAttachment[] = [
        {
          filename: 'photo.jpg',
          data: Buffer.from('fake-image'),
          fileType: 'image/jpeg',
        },
      ];

      const result = await saveUploadedFiles(mockFiles);

      // Проверяем, создалась ли папка
      expect(fs.mkdir).toHaveBeenCalled();
      // Проверяем, записался ли файл
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      // Функция должна вернуть массив путей к сохраненным файлам
      expect(result.length).toBe(1);
      expect(result[0]).toContain('photo.jpg');
    });

    it('должна пропустить файл, если у него нет имени или данных', async () => {
      const mockFiles = [
        { filename: '', data: undefined }, // невалидный файл
      ];

      const result = await saveUploadedFiles(mockFiles as ILeadAttachment[]);

      expect(fs.writeFile).not.toHaveBeenCalled();
      expect(result.length).toBe(0);
    });
  });

  // --- Тест функции отправки Email через Nodemailer ---
  describe('sendToEmail', () => {
    // 2. Создаем правильный мок для sendMail с ответом сервера
    const mockSendMail = vi.fn().mockResolvedValue({ response: '250 OK' });

    beforeEach(() => {
      vi.clearAllMocks(); // Очищает историю вызовов всех моков

      // 3. Связываем наш mockSendMail с createTransport перед каждым тестом
      vi.mocked(nodemailer.createTransport).mockReturnValue({
        sendMail: mockSendMail,
      } as any);

      // Мокаем глобальный логгер, если он еще не замокан
      globalThis.nitroLogger = {
        info: vi.fn(),
        error: vi.fn(),
      } as any;
    });

    it('должна успешно отправить письмо и вызвать логгер', async () => {
      const html = '<html>Тест</html>';
      const from = 'Иван';
      const attachments: ILeadAttachment[] = [
        { filename: '/tmp/uploads/123-photo.jpg', data: undefined },
      ];

      // Вызываем функцию с теми же вложениями, что ждем внутри
      await sendToEmail(html, from, attachments);

      // Проверяем, что логгер получил именно то, что вернул mockSendMail
      expect(globalThis.nitroLogger.info).toHaveBeenCalledWith(
        expect.stringContaining(
          'Сообщение отправлено, ответ от сервера: 250 OK',
        ),
      );
    });
  });

  //   // --- Тест удаления временных файлов ---
  //   describe('cleanUpFiles', () => {
  //     it('должна вызвать fs.unlink для каждого файла', async () => {
  //       vi.mocked(fs.unlink).mockResolvedValue(undefined);

  //       const filePaths = ['/path/1.jpg', '/path/2.jpg'];
  //       await cleanUpFiles(filePaths);

  //       expect(fs.unlink).toHaveBeenCalledTimes(2);
  //       expect(fs.unlink).toHaveBeenNthCalledWith(1, '/path/1.jpg');
  //       expect(fs.unlink).toHaveBeenNthCalledWith(2, '/path/2.jpg');
  //     });

  //     it('не должна прерывать выполнение, если один из файлов не удалился', async () => {
  //       // Имитируем ошибку удаления для первого файла и успех для второго
  //       vi.mocked(fs.unlink)
  //         .mockRejectedValueOnce(new Error('File not found'))
  //         .mockResolvedValueOnce(undefined);

  //       const filePaths = ['/path/broken.jpg', '/path/good.jpg'];

  //       // Тест должен успешно завершиться без выброса ошибки наружу
  //       await expect(cleanUpFiles(filePaths)).resolves.not.toThrow();
  //       expect(fs.unlink).toHaveBeenCalledTimes(2);
  //     });
  //   });
});
