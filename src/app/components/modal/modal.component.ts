import { PopupItem } from '@/store/modals/state';
import { ComponentType } from '@/utils/component-type';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @Input() config: PopupItem;
  private modalInstance: any;
  component: Type<any>;
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.elementRef.nativeElement.querySelector('#myModal'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config && this.config.component) {
      this.component = ComponentType.get(this.config.component);
      this.open();
    }
  }

  async open() {
    this.modalInstance.show();
  }

  close() {
    this.modalInstance.hide();
  }
}
