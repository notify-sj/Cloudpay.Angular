import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';



@NgModule({
  declarations: [
    ModalComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    ProfileCardComponent
  ]
})
export class SharedModule { }
