import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  IsPermanentCollapsed: boolean = false;
  IsMailingCollapsed: boolean = false;
  constructor() {
    console.log("Addres");
  }

  Collapsed(IsPermanent: boolean) {
    if (IsPermanent)
      this.IsPermanentCollapsed = !this.IsPermanentCollapsed;
    else
      this.IsMailingCollapsed = !this.IsMailingCollapsed;
  }
}
