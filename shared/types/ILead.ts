export interface ILead {
  name: string;
  phone: string;
  home: string;
  location: string;
  message: string;
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
