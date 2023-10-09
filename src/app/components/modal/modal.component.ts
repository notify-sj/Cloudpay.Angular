import { selectModalState } from '@/store/modals/selector';
import { PopupItem } from '@/store/modals/state';
import { AppState } from '@/store/state';
import { Component, ElementRef, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as bootstrap from 'bootstrap';
import { Observable, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  size: 'default' | 'l' | 's' | 'xl' = 'default';
  private modalInstance: any;
  dynamicComponent: any;
  modal: Observable<PopupItem>;
  subscription: Subscription;

  constructor(private elementRef: ElementRef, private store: Store<AppState>) {
    this.modal = store.pipe(select(selectModalState));
  }

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.elementRef.nativeElement.querySelector('#myModal'));
  }

  open() {
    this.subscription = this.modal.pipe(filter((state) => state !== undefined)).subscribe((item: PopupItem) => {
      this.dynamicComponent = item.component;
      this.size = item.size;
      this.modalInstance.show();
    });
  }

  close() {
    this.modalInstance.hide();
    if(this.subscription)
    this.subscription.unsubscribe();
  }
}
