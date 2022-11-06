import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromAdminUser from './admin-user.reducer';
import * as fromClient from './client.reducer';

export interface AppState {
  adminUser: fromAdminUser.UserState;
  client: fromClient.ClientState;
}

export const reducers: ActionReducerMap<AppState> = {
  adminUser: fromAdminUser.reducer,
  client: fromClient.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getAdminUserState = (state: AppState) => state.adminUser;
export const getClientState = (state: AppState) => state.client;

export const selectAdminUser = createSelector(
  getAdminUserState,
  fromAdminUser.getAdminUser
);

export const selectClient = createSelector(
  getClientState,
  fromClient.getClient
);
