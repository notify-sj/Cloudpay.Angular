import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AboutMeComponent } from './components/about-me/about-me.component';



@NgModule({
  declarations: [
    ModalComponent,
    ProfileCardComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    ProfileCardComponent,
    AboutMeComponent
  ]
})
export class SharedModule { }
