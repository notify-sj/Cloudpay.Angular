import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@modules/shared/shared.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AddressComponent } from './components/address/address.component';
import { DocumentComponent } from './components/document/document.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class ProfileModule { }
