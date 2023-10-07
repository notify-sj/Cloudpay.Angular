import { createAction, props } from '@ngrx/store';
import { PopupItem } from './state';

export const openModal = createAction(
    '[Modal] Open',
    props<{ item: PopupItem }>()
);

export const closeModal = createAction('[Modal] Close');