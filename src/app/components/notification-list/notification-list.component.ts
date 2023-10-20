import { ComponentData } from '@/utils/component-data';
import { component_data } from '@/utils/component-constant';
import { ModalSize } from '@/utils/modal-size';
import { PopupItem } from '@/utils/popup-item';
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
  _popupItem: PopupItem;
  selectedSize: ModalSize = ModalSize.lg;
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

  openNotificationDashboard(notification: UserNotification) {
    let cd: ComponentData = {
        data: notification
    };
    this._popupItem = {
        component: "NotificationDashboardComponent",
        size: this.selectedSize,
        title: "Notifications",
        footer: false,
        data: cd
    };
}
}
