import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as sessionVariableActions from './actions';
import { AppConfigService } from '@services/app-config.service';

@Injectable()
export class SessionVariableEffects {
  constructor(
    private actions$: Actions,
    private appConfigService: AppConfigService
  ) {}

  loadUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(sessionVariableActions.loadSessionVariable),
    mergeMap(() => from(this.appConfigService.getConfig()).pipe(
      map(session => sessionVariableActions.loadSessionVariableSuccess({ session })),
      catchError(() => of({ type: '[User] Load Session Variable Error' }))
    ))
  ));
}