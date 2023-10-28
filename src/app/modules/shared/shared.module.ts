import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';
import { TabComponent } from './components/tab/tab.component';



@NgModule({
  declarations: [
    ModalComponent,
    ProfileCardComponent,
    AboutMeComponent,
    EmployeeNavbarComponent,
    TabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    ProfileCardComponent,
    AboutMeComponent,
    EmployeeNavbarComponent,
    TabComponent
  ]
})
export class SharedModule { }
