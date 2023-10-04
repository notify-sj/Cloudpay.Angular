import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Store } from '@ngrx/store';
import { AppState } from '@/store/state';
import { loadUserProfile, loadUserProfileSuccess } from '@/store/user/actions';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: EmployeeProfile = null;

    constructor(private router: Router, private store: Store,
        private apiService: ApiService) { }

    async getUserProfile() {
        if (this.user)
            return this.user;
        else null;
    }

    getProfile(defaults?: EmployeeProfile): Promise<EmployeeProfile> {
        return new Promise<EmployeeProfile>((resolve) => {
            this.apiService.get<EmployeeProfile>("hrms", "Employee/Profile").subscribe(profile => {
                this.user = Object.assign({}, defaults || {}, profile || {});
                this.store.dispatch(loadUserProfile());
                resolve(this.user);
            });
        });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
