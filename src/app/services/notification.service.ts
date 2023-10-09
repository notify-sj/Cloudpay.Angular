import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from './api.service';
import { UserNotification } from '@/utils/user-notification';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<UserNotification[]>(null);
  constructor(private store: Store,
    private apiService: ApiService) { }


  getNotification() {
    if (this.notifications.getValue() !== null)
      return this.notifications;
    else
      return this.getNotifications();
  }

  private getNotifications(): Observable<UserNotification[]> {
    return this.apiService.get<UserNotification[]>("notification", "Notification")
      .pipe(
        tap(notifications => this.notifications.next(notifications)));
  }
}
