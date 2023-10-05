import { createAction, props } from '@ngrx/store';

export const loadMenuItemActiveIds = createAction('[User] Load MenuItem Active Ids');
export const loadMenuItemActiveIdsSuccess = createAction('[User] Load MenuItem Active Ids Success', props<{ activeIds: number[] }>());