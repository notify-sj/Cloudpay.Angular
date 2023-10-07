import { UserNotification } from '@/utils/user-notification';
import { createAction, props } from '@ngrx/store';

export const loadNotification = createAction('[User] Load Notification');
export const loadNotificationSuccess = createAction('[User] Load Notification Success', props<{ notification: Array<UserNotification> }>());