import { selectNotificationState } from '@/store/notifications/selector';
import { AppState } from '@/store/state';
import { pluralize } from '@/utils/common-functions';
import { ComponentData } from '@/utils/component-data';
import { ModalSize } from '@/utils/modal-size';
import { PopupItem } from '@/utils/popup-item';
import { UserNotification } from '@/utils/user-notification';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @HostBinding('class')
    get hostClasses() {
        return this.classString;
    }

    private classString: string = 'nav-item dropdown';
    notification_count: number = 0;
    notification_header_message: string = "";
    notification_data: UserNotification[] = [];
    NotifiCount: number = 3;
    public notifications: Observable<UserNotification[]>;
    selectedSize: ModalSize = ModalSize.lg;
    component: any;
    isActive: boolean = false;
    _popupItem: PopupItem;

    constructor(private store: Store<AppState>) {
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

    async openModal(notification: UserNotification) {
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

    itemClick() {
        this.isActive = !this.isActive;
    }

    @HostListener('document:click', ['$event'])
    handleDocumentClick(event: Event): void {
        // Check if the click is outside the dropdown button
        const clickedInside = event.target && (event.target as HTMLElement).closest('.dropdown');
        if (!clickedInside && this.isActive) {
            this.isActive = !this.isActive;
        }
    }
}
