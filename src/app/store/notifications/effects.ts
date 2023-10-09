import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from '@services/notification.service';
import * as notificationActions from './actions';

@Injectable()
export class NotificationEffects {
  loadNotifications$ = createEffect(() => this.actions$.pipe(
    ofType(notificationActions.loadNotifications),
    mergeMap(() => this.notificationService.getNotification().pipe(
      map(notify => notificationActions.loadNotificationsSuccess({ notify })),
      catchError(error => of(notificationActions.loadNotificationsFailure({ error })))
    ))
  ));
    
  
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) { }
}