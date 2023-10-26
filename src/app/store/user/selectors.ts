import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeProfile } from "@/utils/employee-profile";

const selectUserStateFeature = createFeatureSelector<EmployeeProfile>('user');

export const selectUserState = createSelector(
    selectUserStateFeature,
    (state: any) => state.profile
);