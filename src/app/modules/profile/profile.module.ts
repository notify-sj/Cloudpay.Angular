import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@modules/shared/shared.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AddressComponent } from './components/address/address.component';
import { DocumentComponent } from './components/document/document.component';
import { AboutMeComponent } from './components/about-me/about-me.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCardComponent,
    AddressComponent,
    DocumentComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
