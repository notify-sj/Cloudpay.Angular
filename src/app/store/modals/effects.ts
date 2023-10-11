import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ModalService } from '@services/modal.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as modalActions from './actions';

@Injectable()
export class ModalEffects {
  loadModals$ = createEffect(() => this.actions$.pipe(
    ofType(modalActions.ModalOpener),
    switchMap(() => of(this.modalService.GetPopupItem()).pipe(
      map(item => modalActions.openModalSuccess({item}))
    )),
      catchError(error => of(modalActions.openModalFailure({ error })))
    ));
      
  constructor(
    private actions$: Actions,
    private modalService: ModalService
  ) { }
}