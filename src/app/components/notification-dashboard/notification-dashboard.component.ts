import { Component, ViewContainerRef, inject } from '@angular/core';

@Component({
  selector: 'app-notification-dashboard',
  templateUrl: './notification-dashboard.component.html',
  styleUrls: ['./notification-dashboard.component.scss']
})
export class NotificationDashboardComponent {
  vcr = inject(ViewContainerRef);
}
