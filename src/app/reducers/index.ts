import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAdminUser from './admin-user.reducer';
import * as fromCleanerUser from './cleaner-user.reducer';
import * as fromClient from './client.reducer';

export interface AppState {
  adminUser: fromAdminUser.UserState;
  cleanerUser: fromCleanerUser.CleanerState;
  client: fromClient.ClientState;
}

export const reducers: ActionReducerMap<AppState> = {
  adminUser: fromAdminUser.reducer,
  cleanerUser: fromCleanerUser.reducer,
  client: fromClient.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getAdminUserState = (state: AppState) => state.adminUser;
export const getCleanerUserState = (state: AppState) => state.cleanerUser;
export const getClientState = (state: AppState) => state.client;

export const selectAdminUser = createSelector(
  getAdminUserState,
  fromAdminUser.getAdminUser
);

export const selectCleanerUser = createSelector(
  getCleanerUserState,
  fromCleanerUser.getCleanerUser
);

export const selectClient = createSelector(
  getClientState,
  fromClient.getClient
);
