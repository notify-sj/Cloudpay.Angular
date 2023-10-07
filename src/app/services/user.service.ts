import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Store } from '@ngrx/store';
import { loadUserProfile } from '@/store/user/actions';

@Injectable({
    providedIn: 'root'
})
export class UserService {
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
        window.parent.postMessage('logout', '*');
    }
}
