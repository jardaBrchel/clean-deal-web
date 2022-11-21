import * as CleanerUserActions from '../actions/cleaner-user.actions';
import {createReducer, on} from '@ngrx/store';
import {CleanerUser} from '../models/cleaner.model';

export interface CleanerState {
  cleanerUser: CleanerUser;
}

export const initialState: CleanerState = {
  cleanerUser: undefined!,
};

export const reducer = createReducer(
  initialState,
  on(CleanerUserActions.setCleanerUser, (state, cleanerUser) =>
    ({...state, cleanerUser})),
  on(CleanerUserActions.removeCleanerUser, (state) =>
    ({...state, cleanerUser: {}})),
);

export const getCleanerUser = (state: CleanerState) => state.cleanerUser;
