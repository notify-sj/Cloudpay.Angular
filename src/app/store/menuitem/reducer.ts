import { createReducer, on } from '@ngrx/store';
import * as menuItemActions from './actions';

export const initialState = {};

const _menuItemReducer = createReducer(
  initialState,
  on(menuItemActions.loadMenuItemActiveIdsSuccess, (state, { activeIds }) => ({ ...state, activeIds }))
);

export function menuItemReducer(state, action) {
  return _menuItemReducer(state, action);
}