import { selectNotificationState } from '@/store/notifications/selector';
import { AppState } from '@/store/state';
import { pluralize } from '@/utils/common-functions';
import { ComponentData } from '@/utils/component-data';
import { ModalSize } from '@/utils/modal-size';
import { PopupItem } from '@/utils/popup-item';
import { UserNotification } from '@/utils/user-notification';
import { Component, HostBinding, OnInit } from '@angular/core';
import { HeaderChildComponent } from '@modules/main/header/header-child.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DropdownService } from '../dropdown.service';
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends HeaderChildComponent implements OnInit {
    notification_count: number = 0;
    notification_header_message: string = "";
    notification_data: UserNotification[] = [];
    NotifiCount: number = 3;
    public notifications: Observable<UserNotification[]>;
    selectedSize: ModalSize = ModalSize.lg;
    component: any;
    _popupItem: PopupItem;

    constructor(private store: Store<AppState>,
        dropdownService: DropdownService) {
        super(dropdownService);
        this.notifications = this.store.pipe(select(selectNotificationState));
    }

    ngOnInit(): void {
        this.notifications.subscribe((notification: UserNotification[]) => {
            if (notification) {
                this.notification_count = notification.length;
                this.notification_header_message = `${this.notification_count} ${pluralize(
                    this.notification_count,
                    "Notification"
                )}`;
                this.notification_data = notification;
            }
        });
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
            data: cd,
            okButtonLabel: "Ok"
        };
    }

    openNotification() {
        let cd: ComponentData = {
            data: this.notification_data
        };
        this._popupItem = {
            component: "NotificationListComponent",
            size: this.selectedSize,
            title: "Notifications",
            footer: false,
            data: cd,
            okButtonLabel: "Ok"
        };
    }
}
