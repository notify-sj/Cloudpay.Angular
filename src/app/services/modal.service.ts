import { openModal } from '@/store/modals/actions';
import { PopupItem } from '@/store/modals/state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _popItem = new BehaviorSubject<PopupItem>(null);

  GetPopupItem() {
    if (this._popItem.getValue() !== null)
      return this._popItem;
    return null;
  }

  SetPopupItem(value: PopupItem) {
    this._popItem.next(value);
    this.store.dispatch(openModal());
  }
  constructor(private store: Store) { }

}
