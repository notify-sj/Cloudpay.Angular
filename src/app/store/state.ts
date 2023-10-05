import { EmployeeProfile } from '@/utils/employee-profile';
import { UiState } from './ui/state';
import { SessionVariable } from '@/utils/session-variable';

export interface AppState {
    auth: SessionVariable;
    ui: UiState;
    user: EmployeeProfile;
    activeMenuItem: number[];
}
