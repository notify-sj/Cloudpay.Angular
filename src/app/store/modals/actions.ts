import { createAction, props } from '@ngrx/store';
import { PopupItem } from './state';

export const openModalSuccess = createAction(
    '[Modal] Open Success',
    props<{ item: PopupItem }>()
);

export const ModalOpener = createAction('[Modal] Open');

export const openModalFailure = createAction(
  '[Modal] Open Failure',
  props<{ error: any }>()
);