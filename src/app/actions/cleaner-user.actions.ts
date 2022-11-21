import {createAction, props} from '@ngrx/store';
import {CleanerUser} from '../models/cleaner.model';

export const setCleanerUser = createAction(
  '[CleanerUser] Set user',
  props<CleanerUser>(),
);

export const removeCleanerUser = createAction(
  '[CleanerUser] Remove user'
);
