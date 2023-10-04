import { EmployeeProfile } from '@/utils/employee-profile';
import { createAction, props } from '@ngrx/store';

export const loadUserProfile = createAction('[User] Load Profile');
export const loadUserProfileSuccess = createAction('[User] Load Profile Success', props<{ profile: EmployeeProfile }>());