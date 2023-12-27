import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileCardComponent } from '../profile/components/profile-card/profile-card.component';
import { AboutMeComponent } from '../profile/components/about-me/about-me.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';
import { TabComponent } from './components/tab/tab.component';
import { AddressComponent } from '../profile/components/address/address.component';
import { DocumentComponent } from '../profile/components/document/document.component';
import { BlankComponent } from './components/blank/blank.component';
import { DualListboxComponent } from './components/dual-listbox/dual-listbox.component';



@NgModule({
  declarations: [
    ModalComponent,
    EmployeeNavbarComponent,
    TabComponent,
    BlankComponent,
    DualListboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    EmployeeNavbarComponent,
    TabComponent,
    DualListboxComponent
  ]
})
export class SharedModule { }
