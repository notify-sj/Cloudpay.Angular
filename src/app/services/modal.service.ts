import { ModalOpener } from '@/store/modals/actions';
import { PopupItem, initialPopupItem } from '@/store/modals/state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _popItem: PopupItem = null;

  GetPopupItem(): PopupItem {
    return this._popItem;
  }

  SetPopupItem(value: PopupItem) {
    this._popItem = value;
    this.store.dispatch(ModalOpener());
  }
  constructor(private store: Store) { }

}
