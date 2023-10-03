import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export const initialState = {};

const _userReducer = createReducer(
  initialState,
  on(userActions.loadUserProfileSuccess, (state, { profile }) => ({ ...state, profile, loaded:true }))
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}