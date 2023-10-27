import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EmployeeProfile, EmployeeProfileDetail } from '@/utils/employee-profile';
import { Store } from '@ngrx/store';
import { loadUserProfile } from '@/store/user/actions';
import { LoginConfig } from '@/utils/login-config';
import { BaseResult, Result } from '@/utils/result';
import { Endpoint } from '@/utils/endpoint-constants';
import { ToastrService } from 'ngx-toastr';
import { Unit } from '@/utils/unit';
import { AppConfigService } from './app-config.service';
import { Role } from '@/utils/role';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user: EmployeeProfile = null;

    constructor(private router: Router, private store: Store,
        private apiService: ApiService,
        private toastr: ToastrService,
        private appConfig: AppConfigService) { }

    async getUserProfile() {
        if (this.user)
            return this.user;
        else
            return this.getProfile();
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
        let data = {
            type: "logout"
        }
        window.parent.postMessage(data, '*');
    }

    getLoginConfig(defaults?: LoginConfig): Promise<LoginConfig> {
        return new Promise<LoginConfig>((resolve) => {
            this.apiService.get<LoginConfig>(Endpoint.LoginConfig).subscribe(config => {
                let obj = Object.assign({}, defaults || {}, config || {}) as LoginConfig;
                resolve(obj);
            });
        });
    }

    getAssignedUnits(): Promise<Array<Unit>> {
        return new Promise<Array<Unit>>((resolve) => {
            this.apiService.get<Array<Unit>>(Endpoint.AssignedUnits).subscribe(units => {
                resolve(units);
            });
        });
    }

    getAssignedRoles(): Promise<Array<Role>> {
        return new Promise<Array<Role>>((resolve) => {
            this.apiService.get<Array<Role>>(Endpoint.AssignedRoles).subscribe(roles => {
                resolve(roles);
            });
        });
    }

    getProfileDetail(defaults?: EmployeeProfileDetail): Promise<EmployeeProfileDetail> {
        return new Promise<EmployeeProfileDetail>((resolve) => {
            this.apiService.get<EmployeeProfileDetail>(Endpoint.ProfileDetail).subscribe(profile => {
                let userDetail = Object.assign({}, defaults || {}, profile || {});
                resolve(userDetail);
            });
        });
    }

    changePassword(value: any) {
        const data = {
            old_pass: value.currentPassword,
            new_pass: value.newPassword,
        };
        this.apiService.put<BaseResult>(Endpoint.ChangePassword, data)
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

    switchUnit(unit: Unit) {
        const data = {
            UNIT_ENTID: unit.UNIT_ENTID,
            UNIT_INIT: unit.UNIT_INIT,
        };
        this.apiService.put<Result<number>>(Endpoint.SwitchUnit, data)
            .subscribe((result: Result<number>) => {
                if (result.status === "Success") {
                    const url = new URL(window.location.href);
                    let data = {
                        type: "switchUnit",
                        token: url.origin + url.pathname + "?token=" + result.data.toString()
                    }
                    window.parent.postMessage(data, '*');
                }
                else
                    this.toastr.info(result.message, "Switch Unit");
            });
    }


    switchRole(role: Role) {
        const data = {
            ROLE_NAME: role.ROLE_NAME,
            ROLE_ID: role.ROLE_ID,
        };
        this.apiService.put<Result<string>>(Endpoint.SwitchRole, data)
            .subscribe((result: Result<string>) => {
                if (result.status === "Success") {
                    let data = {
                        type: "switchRole",
                        token: result.data.toString(),
                        roleName: role.ROLE_NAME,
                        roleId: role.ROLE_ID
                    }
                    window.parent.postMessage(data, '*');
                }
                else
                    this.toastr.info(result.message, "Switch Role");
            });
    }
}
