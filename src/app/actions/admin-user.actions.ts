import {createAction, props} from '@ngrx/store';

export const setAdminUser = createAction(
  '[AdminUser] Set user',
  props<{ adminUser: any }>(),
);

export const removeUser = createAction(
  '[AdminUser] Remove user'
);
