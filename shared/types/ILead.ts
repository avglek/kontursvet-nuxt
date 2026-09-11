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
  data: Buffer | undefined;
  fileType?: string;
}

export interface ILeadMessage {
  text: ILead;
  attachments: ILeadAttachment[];
}
