import { ComponentData } from '@/utils/component-data';
import { component_data } from '@/utils/constants';
import { UserNotification } from '@/utils/user-notification';
import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  @Input() _componentData: ComponentData;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: any;

  public notifications: UserNotification[] = [];

  constructor(@Inject(component_data) private componentData: ComponentData) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this._componentData = this._componentData || this.componentData;
    this.notifications = this._componentData.data;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true, // Enable responsive design
      autoWidth: false, // Disable auto-width for columns
    };
    setTimeout(function () {
      this.dtTrigger.next();
    }.bind(this));
  }
}
