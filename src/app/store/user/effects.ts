import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userActions from './actions';
import { UserService } from '@services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUserProfile),
    mergeMap(() => from(this.userService.getUserProfile()).pipe(
      map(profile => userActions.loadUserProfileSuccess({ profile })),
      catchError(() => of({ type: '[User] Load Profile Error' }))
    ))
  ));
}