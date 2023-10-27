import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardSettingsComponent } from './pages/dashboard/dashboard-settings/dashboard-settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SelfRoutingModule } from './self-routing.module';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSettingsComponent,
    ProfileComponent,
    BlankComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SelfRoutingModule
  ]
})
export class SelfModule { }
