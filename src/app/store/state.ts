import { EmployeeProfile } from '@/utils/employee-profile';
import { UiState } from './ui/state';

export interface AppState {
    auth: any;
    ui: UiState;
    user: EmployeeProfile;
}
