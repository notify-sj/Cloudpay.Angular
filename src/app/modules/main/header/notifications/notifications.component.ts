import { PopupItem } from '@/store/modals/state';
import { selectNotificationState } from '@/store/notifications/selector';
import { NotificationState } from '@/store/notifications/state';
import { AppState } from '@/store/state';
import { pluralize } from '@/utils/common-functions';
import { ModalSize } from '@/utils/modal-size';
import { UserNotification } from '@/utils/user-notification';
import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@components/modal/modal.component';

import { NotificationDashboardComponent } from '@components/notification-dashboard/notification-dashboard.component';
import { Store, select } from '@ngrx/store';
import { ModalService } from '@services/modal.service';
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
    selectedSize: ModalSize = ModalSize.default;
    component: any;
    isActive: boolean = false;
    // @ViewChild('myModal') myModal: ModalComponent;

    constructor(private store: Store<AppState>, private modalService: ModalService) {
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

    openModal() {
        const initialPopupItem: PopupItem = {
            component: NotificationDashboardComponent,
            size: this.selectedSize
          };
          this.modalService.SetPopupItem(initialPopupItem);
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
