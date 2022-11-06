import {createAction, props} from '@ngrx/store';
import {AdminUser} from '../models/admin.model';
import {Client} from '../models/client.model';

export const setClient = createAction(
  '[client] Set user',
  props<Client>(),
);

export const removeClient = createAction(
  '[client] Remove user'
);
