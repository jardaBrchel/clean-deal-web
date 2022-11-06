import * as ClientActions from '../actions/client.actions';
import {createReducer, on} from '@ngrx/store';
import {Client} from '../models/client.model';

export interface ClientState {
  client: Client | null;
}

export const initialState: ClientState = {
  client: undefined!,
};

export const reducer = createReducer(
  initialState,
  on(ClientActions.setClient, (state, client) =>
    ({...state, client})),
  on(ClientActions.removeClient, (state) =>
    ({...state, client: null})),
);

export const getClient = (state: ClientState) => state.client;
