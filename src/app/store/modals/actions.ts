import { createAction, props } from '@ngrx/store';
import { PopupItem } from './state';

export const openModalSuccess = createAction(
    '[Modal] Open',
    props<{ item: PopupItem }>()
);

export const openModal = createAction('[Modal] Open');

export const openModalFailure = createAction(
  '[Modal] Open Failure',
  props<{ error: any }>()
);