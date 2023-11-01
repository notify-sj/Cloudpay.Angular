import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardSettingsComponent } from './components/dashboard/dashboard-settings/dashboard-settings.component';
import { SelfRoutingModule } from './self-routing.module';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SelfRoutingModule
  ]
})
export class SelfModule { }
