// actions/user.actions.ts
import { AppState } from '@/store/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { createAction, props } from '@ngrx/store';

export const isUserProfileLoaded = (state: AppState) => state.user.loaded;
export const loadUserProfile = createAction('[User] Load Profile');
export const loadUserProfileSuccess = createAction('[User] Load Profile Success', props<{ profile: EmployeeProfile }>());