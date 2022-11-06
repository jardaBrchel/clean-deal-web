import {Client, ClientRes} from '../models/client.model';

export const mapClient = (data: ClientRes) => {
  return {
    clientId: data.clientId,
    email: data.email,
    name: data.name,
    surname: data.surname,
    info: data.info,
    contactAddress: data.contactAddress,
    phone: data.phone,
  } as Client;
}
