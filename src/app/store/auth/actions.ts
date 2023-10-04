import { SessionVariable } from '@/utils/session-variable';
import { createAction, props } from '@ngrx/store';

export const loadSessionVariable = createAction('[User] Load Session Variable');
export const loadSessionVariableSuccess = createAction('[User] Load Session Variable Success', props<{ session: SessionVariable }>());