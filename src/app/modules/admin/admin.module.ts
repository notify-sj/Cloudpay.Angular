import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AssignmentAccessComponent } from './assignment-access/assignment-access.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AssignmentAccessComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
