import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalPopup]',
})
export class ModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}