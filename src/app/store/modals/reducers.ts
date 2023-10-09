import { createReducer, on } from '@ngrx/store';
import * as modalActions from './actions';
import { initialPopupItem } from './state';

const _modalReducer = createReducer(
  initialPopupItem,
  on(modalActions.openModalSuccess, (state, { item }) => ({ ...state, item }))
);

export function modalReducer(state, action) {
  return _modalReducer(state, action);
}