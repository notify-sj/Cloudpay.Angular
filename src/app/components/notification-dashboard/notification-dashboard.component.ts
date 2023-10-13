import { ComponentData } from '@/utils/component-data';
import { component_data } from '@/utils/constants';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-dashboard',
  templateUrl: './notification-dashboard.component.html',
  styleUrls: ['./notification-dashboard.component.scss']
})
export class NotificationDashboardComponent implements OnInit {
  @Input() _componentData: ComponentData;
  Heading: string;
  Message: string;

  constructor(@Inject(component_data) private componentData: ComponentData) { }

  ngOnInit(): void {
    this._componentData = this._componentData || this.componentData;
    this.Heading = this._componentData.data.notification_heading;
    this.Message = this._componentData.data.notification_message;
  }
}
