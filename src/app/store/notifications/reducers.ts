import { createReducer, on } from '@ngrx/store';
import * as notificationActions from './actions';

export const initialState = {};

const _notificationReducer = createReducer(
  initialState,
  on(notificationActions.loadNotificationSuccess, (state, { notification }) => ({ ...state, notification }))
);

export function notificationReducer(state, action) {
  return _notificationReducer(state, action);
}