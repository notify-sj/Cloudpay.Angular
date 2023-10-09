import { createAction, props } from '@ngrx/store';
import { MenuState } from './state';

export const loadMenuItemState = createAction('[User] Load MenuItem State');
export const loadMenuItemStateSuccess = createAction('[User] Load MenuItem State Success', props<{ menu: MenuState }>());

export const loadMenuItemStateFailure = createAction(
    '[Notification] Load MenuItem State Failure',
    props<{ error: any }>()
  );