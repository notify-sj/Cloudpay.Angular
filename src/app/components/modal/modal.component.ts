import { PopupItem } from '@/store/modals/state';
import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @Input() config: PopupItem;
  private modalInstance: any;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.elementRef.nativeElement.querySelector('#myModal'));
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config && this.config.component) {
      this.open();
    }
  }
  open() {
    this.modalInstance.show();
  }

  close() {
    this.modalInstance.hide();
  }
}
