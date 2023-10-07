import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from '@services/notification.service';
import * as notificationActions from './actions';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService) {}

    loadNotifications$ = createEffect(() => this.actions$.pipe(
        ofType(notificationActions.loadNotification),
        mergeMap(() => from(this.notificationService.getNotification()).pipe(
            map(notification => notificationActions.loadNotificationSuccess({ notification })),
            catchError(() => of({ type: '[User] Load Notification Error' }))
          ))
    ));
}