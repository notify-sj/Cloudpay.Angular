import { createReducer, on } from '@ngrx/store';
import * as notificationActions from './actions';
import { initialState } from './state';

const _notificationReducer = createReducer(
  initialState,
  on(notificationActions.loadNotificationsSuccess, (state, { notify }) => ({ ...state, notify }))
);

export function notificationReducer(state, action) {
  return _notificationReducer(state, action);
}