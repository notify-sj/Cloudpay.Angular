import { createAction, props } from '@ngrx/store';
import { UserNotification } from '@/utils/user-notification';

export const loadNotifications = createAction('[Notification] Load Notifications');
export const loadNotificationsSuccess = createAction(
  '[Notification] Load Notifications Success',
  props<{ notify: UserNotification[] }>()
);
export const loadNotificationsFailure = createAction(
  '[Notification] Load Notifications Failure',
  props<{ error: any }>()
);