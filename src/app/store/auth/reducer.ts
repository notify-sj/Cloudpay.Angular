import { createReducer, on } from '@ngrx/store';
import * as sessionVariableActions from './actions';

export const initialState = {};

const _sessionVariableReducer = createReducer(
  initialState,
  on(sessionVariableActions.loadSessionVariableSuccess, (state, { session }) => ({ ...state, session }))
);

export function sessionVariableReducer(state, action) {
  return _sessionVariableReducer(state, action);
}