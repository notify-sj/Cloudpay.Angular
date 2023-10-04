import { createReducer, on } from '@ngrx/store';
import * as userActions from './actions';

export const initialState = {};

const _userReducer = createReducer(
  initialState,
  on(userActions.loadUserProfileSuccess, (state, { profile }) => ({ ...state, profile }))
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}