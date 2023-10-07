import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from './api.service';
import { UserNotification } from '@/utils/user-notification';
import { loadNotification } from '@/store/notifications/actions';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications: Array<UserNotification> = null;

  constructor(private store: Store,
    private apiService: ApiService) { }


  async getNotification() {
    if (this.notifications)
      return this.notifications;
    else null;
  }

  getNotifications(): Promise<Array<UserNotification>> {
    return new Promise<Array<UserNotification>>((resolve) => {
      this.apiService.get<Array<UserNotification>>("notification", "Notification").subscribe(notification => {
        this.notifications = Object.assign([], [], notification || []);
        this.store.dispatch(loadNotification());
        resolve(this.notifications);
      });
    });
  }
}
