export interface ClientRes {
  clientId: string;
  contactAddress: string;
  email: string;
  info: string;
  name: string;
  password: string;
  phone: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  clientId?: string;
  email?: string;
  name?: string;
  surname?: string;
  info?: string;
  contactAddress?: string;
  phone?: string;
}
