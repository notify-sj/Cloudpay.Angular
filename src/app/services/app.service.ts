import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Store } from '@ngrx/store';
import { AppState } from '@/store/state';
import { loadUserProfileSuccess } from '@/store/ui/actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: EmployeeProfile = {};

    constructor(private router: Router, private toastr: ToastrService, 
        private apiService: ApiService,
        private store: Store<AppState>) { }

    async getProfile(defaults?: EmployeeProfile): Promise<EmployeeProfile> {
        return new Promise<EmployeeProfile>((resolve) => {
            this.apiService.get<EmployeeProfile>("hrms", "Employee/Profile").subscribe(profile => {
                console.log(profile.emp_email);
                this.user = Object.assign({}, defaults || {}, profile || {});
                resolve(this.user);
                this.store.dispatch(loadUserProfileSuccess({ profile }));
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
