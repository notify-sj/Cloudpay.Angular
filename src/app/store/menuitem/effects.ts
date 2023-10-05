import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as menuItemActions from './actions';
import { MenuitemService } from '@components/menu-item/menuitem.service';

@Injectable()
export class MenuItemEffects {
  constructor(
    private actions$: Actions,
    private menuItemService: MenuitemService) {}

  loadActiveIds$ = createEffect(() => this.actions$.pipe(
    ofType(menuItemActions.loadMenuItemActiveIds),
    switchMap(() => of(this.menuItemService.getActiveIds()).pipe(
        map(activeIds => menuItemActions.loadMenuItemActiveIdsSuccess({ activeIds })),
        catchError(() => of({ type: '[User] Load MenuItem Error' }))
      ))
  ))
}