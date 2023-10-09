import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationState } from "./state";

const selectNotificationStateFeature = createFeatureSelector<NotificationState>('notification');

export const selectNotificationState = createSelector(
    selectNotificationStateFeature,
    (state: any) => state.notify
);