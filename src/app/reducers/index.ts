import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAdminUser from './admin-user.reducer';

export interface AppState {
  adminUser: fromAdminUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  adminUser: fromAdminUser.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getAdminUserState = (state: AppState) => state.adminUser;

export const selectAdminUser = createSelector(
  getAdminUserState,
  fromAdminUser.getAdminUser
);
