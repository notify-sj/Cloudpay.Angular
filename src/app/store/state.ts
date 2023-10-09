import { EmployeeProfile } from '@/utils/employee-profile';
import { UiState } from './ui/state';
import { SessionVariable } from '@/utils/session-variable';
import { UserNotification } from '@/utils/user-notification';
import { MenuState } from './menuitem/state';
import { PopupItem } from './modals/state';

export interface AppState {
    auth: SessionVariable;
    ui: UiState;
    user: EmployeeProfile;
    menuState: MenuState;
    notification: UserNotification[];
    modal: PopupItem;
}
