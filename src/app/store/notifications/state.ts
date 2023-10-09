import { UserNotification } from "@/utils/user-notification";

export class NotificationState {
    notifications: UserNotification[];
    error: any;
  }
  
  export const initialState: NotificationState = {
    notifications: [],
    error: null
  };