import nodemailer from 'nodemailer';
import { ILead } from '~~/shared/types/ILead';

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  if (!data) {
    throw createError({ statusCode: 400, message: 'No data received' });
  }

  const attachments: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }> = [];

  const lead: Partial<ILead> = {};

  for (const part of data) {
    if (part.name === 'json') {
      const jsonString = part.data.toString();
      const obj = <ILead>JSON.parse(jsonString);
      const keys = Object.keys(obj);

      keys.forEach((key) => {
        lead[key as keyof ILead] = obj[key as keyof ILead];
      });
    }
    if (part.name === 'files' && part.filename) {
      attachments.push({
        filename: part.filename,
        content: part.data,
        contentType: part.type,
      });
    }
  }

  const config = useRuntimeConfig();

  const htmlbody = await renderEmailComponent('MailOrder', { lead });

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const sendInfo = await transporter.sendMail({
    from: config.smtpFrom,
    to: config.smtpTo,
    subject: `Заявка от ${lead.name}`,
    attachments,
    html: htmlbody.toString(),
  });

  console.log('send info: ', sendInfo);

  return { success: true };
});
