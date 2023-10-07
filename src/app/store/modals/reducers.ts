import { createReducer, on } from '@ngrx/store';
import { initialPopupItem } from './state';
import { closeModal, openModal } from './actions';

export const modalReducer = createReducer(
  initialPopupItem,
  on(openModal, (state, { item }) => ({ ...state, item })),
  on(closeModal, () => initialPopupItem)
);