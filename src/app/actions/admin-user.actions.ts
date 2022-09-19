import {createAction, props} from '@ngrx/store';
import {AdminUser} from '../models/admin.model';

export const setAdminUser = createAction(
  '[AdminUser] Set user',
  props<AdminUser>(),
);

export const removeAdminUser = createAction(
  '[AdminUser] Remove user'
);
