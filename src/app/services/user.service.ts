import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Store } from '@ngrx/store';
import { loadUserProfile } from '@/store/user/actions';
import { LoginConfig } from '@/utils/login-config';
import { BaseResult } from '@/utils/result';
import { Endpoint } from '@/utils/endpoint-constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user: EmployeeProfile = null;

    constructor(private router: Router, private store: Store,
        private apiService: ApiService,
        private toastr: ToastrService) { }

    async getUserProfile() {
        if (this.user)
            return this.user;
        else null;
    }

    getProfile(defaults?: EmployeeProfile): Promise<EmployeeProfile> {
        return new Promise<EmployeeProfile>((resolve) => {
            this.apiService.get<EmployeeProfile>(Endpoint.Profile).subscribe(profile => {
                this.user = Object.assign({}, defaults || {}, profile || {});
                this.store.dispatch(loadUserProfile());
                resolve(this.user);
            });
        });
    }

    logout() {
        window.parent.postMessage('logout', '*');
    }

    getLoginConfig(defaults?: LoginConfig): Promise<LoginConfig> {
        return new Promise<LoginConfig>((resolve) => {
            this.apiService.get<LoginConfig>(Endpoint.LoginConfig).subscribe(config => {
                let obj = Object.assign({}, defaults || {}, config || {}) as LoginConfig;
                resolve(obj);
            });
        });
    }

    changePassword(value: any) {
        const param = {
            old_pass: value.currentPassword,
            new_pass: value.newPassword,
        };
        this.apiService.put<BaseResult>(Endpoint.ChangePassword, param)
            .subscribe((result: BaseResult) => {
                if (result.status === "Success") {
                    this.toastr.success(result.message, "Change Password");
                    setTimeout(function () {
                        this.logout();
                      }.bind(this), 1000);
                }
                else
                    this.toastr.info(result.message, "Change Password");
            });
    }
}
