import { openModal } from '@/store/modals/actions';
import { PopupItem } from '@/store/modals/state';
import { AppState } from '@/store/state';
import { pluralize } from '@/utils/common-functions';
import { UserNotification } from '@/utils/user-notification';
import { Component, HostBinding, OnInit } from '@angular/core';

import { NotificationDashboardComponent } from '@components/notification-dashboard/notification-dashboard.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @HostBinding('class') classes: string = "nav-item";
    notification_count: number = 0;
    notification_header_message: string = "";
    notification_data: UserNotification[] = [];
    NotifiCount: number = 3;
    item: PopupItem;
    public notifications: Observable<Array<UserNotification>>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.notifications = this.store.select("notification");
        this.notifications.subscribe((notify: any) => {
            let notification = notify.notification as UserNotification[];
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

    rowClick(d: UserNotification) {
        this.store.dispatch(openModal({
            item: {
                component: NotificationDashboardComponent, 
                data: d
            }
        }));
    }
}
