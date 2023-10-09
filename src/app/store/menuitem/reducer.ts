import { createReducer, on } from '@ngrx/store';
import * as menuItemActions from './actions';

export const initialState = {};

const _menuStateReducer = createReducer(
  initialState,
  on(menuItemActions.loadMenuItemStateSuccess, (state, { menu }) => ({ ...state, menu }))
);

export function menuStateReducer(state, action) {
  return _menuStateReducer(state, action);
}