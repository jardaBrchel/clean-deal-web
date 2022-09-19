import * as AdminUserActions from '../actions/admin-user.actions';
import {createReducer, on} from '@ngrx/store';
import {AdminUser} from '../models/admin.model';

export interface UserState {
  adminUser: AdminUser;
}

export const initialState: UserState = {
  adminUser: undefined!,
};

export const reducer = createReducer(
  initialState,
  on(AdminUserActions.setAdminUser, (state, adminUser) =>
    ({...state, adminUser})),
  on(AdminUserActions.removeAdminUser, (state) =>
    ({...state, adminUser: {}})),
);

export const getAdminUser = (state: UserState) => state.adminUser;
