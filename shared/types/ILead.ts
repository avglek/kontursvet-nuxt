export interface ILead {
  name: string;
  phone: ILeadPhone;
  home: string;
  location: string;
  message: string;
}

export interface ILeadPhone {
  digital: string;
  format: string;
}

export interface ILeadAttachment {
  filename: string;
  content: Buffer | undefined;
  contentType?: string | undefined;
  encoding: 'base64';
}

export interface ILeadMessage {
  text: ILead;
  attachments: ILeadAttachment[];
}
