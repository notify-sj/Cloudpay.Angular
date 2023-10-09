import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ModalService } from '@services/modal.service';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as modalActions from './actions';

@Injectable()
export class ModalEffects {
  loadNotifications$ = createEffect(() => this.actions$.pipe(
    ofType(modalActions.openModal),
    mergeMap(() => from(this.modalService.GetPopupItem()).pipe(
      map(item => modalActions.openModalSuccess({ item })),
      catchError(error => of(modalActions.openModalFailure({ error })))
    ))
  ));
    
  
  constructor(
    private actions$: Actions,
    private modalService: ModalService
  ) { }
}