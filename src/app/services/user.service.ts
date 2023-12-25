import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EmployeeAboutMeDetail, EmployeeProfile, EmployeeProfileDetail } from '@/utils/employee-profile';
import { Store } from '@ngrx/store';
import { loadUserProfile } from '@/store/user/actions';
import { LoginConfig } from '@/utils/login-config';
import { BaseResult, Result } from '@/utils/result';
import { Endpoint } from '@/utils/endpoint-constants';
import { ToastrService } from 'ngx-toastr';
import { Unit } from '@/utils/unit';
import { AppConfigService } from './app-config.service';
import { Role } from '@/utils/role';
import { QueryParamType, Queryparams } from '@/utils/queryparams';
import { MenuItemDto } from '@/utils/menu-item';
import { MasterData } from '@/utils/master-data';
import { AddressDetail, AddressInformation } from '@/utils/address-detail';
import { UserDocuments } from '@/utils/user-documents';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

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

    getProfileDetail(id: number): Promise<EmployeeProfileDetail> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id)
        ];
        return new Promise<EmployeeProfileDetail>((resolve) => {
            this.apiService.get<EmployeeProfileDetail>(Endpoint.ProfileDetail, query).subscribe(profile => {
                let userDetail = Object.assign({}, {}, profile || {});
                resolve(userDetail);
            });
        });
    }

    getEmployeeByRoleId(query: Queryparams[]): Promise<Array<MasterData>> {
        return new Promise<Array<MasterData>>((resolve) => {
            this.apiService.get<Array<MasterData>>(Endpoint.EmployeeByRole, query).subscribe(tabs => {
                resolve(tabs);
            });
        });
    }

    getAboutMeDetail(id: number): Promise<EmployeeAboutMeDetail> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id)
        ];
        return new Promise<EmployeeAboutMeDetail>((resolve) => {
            this.apiService.get<EmployeeAboutMeDetail>(Endpoint.AboutMeDetail, query).subscribe(profile => {
                let userDetail = Object.assign({}, {}, profile || {});
                resolve(userDetail);
            });
        });
    }

    getAddressDetail(id: number): Promise<AddressInformation> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id)
        ];
        return new Promise<AddressInformation>((resolve) => {
            this.apiService.get<AddressInformation>(Endpoint.AddressDetail, query).subscribe(profile => {
                let userDetail = Object.assign({}, {}, profile || {});
                resolve(userDetail);
            });
        });
    }
    getUserDocuments(id: number): Promise<UserDocuments[]> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id)
        ];
        return new Promise<UserDocuments[]>((resolve, reject) => {
            this.apiService.get<UserDocuments[]>(Endpoint.UserDocuments, query).subscribe(profile => {
                if (profile) {
                    resolve(profile); // Assuming 'profile' is already of type UserDocuments[]
                } else {
                    reject('No data found'); // Handle the case where no data is returned
                }
            },
                error => {
                    reject(error); // Handle any API errors
                });
        });
    }

    getUserDocument(id: number, rec_id: number): Promise<Blob> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id),
            new Queryparams(QueryParamType.QUERY, "recid", rec_id)
        ];

        return new Promise<Blob>((resolve, reject) => {
            this.apiService.getFile(Endpoint.UserDocument, query).subscribe(blob => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject('No data found'); // Handle the case where no data is returned
                }
            },
                error => {
                    reject(error); // Handle any API errors
                });
        });
    }

    getEmpTabs(): Promise<Array<MenuItemDto>> {
        return new Promise<Array<MenuItemDto>>((resolve) => {
            this.apiService.get<Array<MenuItemDto>>(Endpoint.EmpTabs).subscribe(tabs => {
                resolve(tabs);
            });
        });
    }

    changePassword(value: any) {
        const data = {
            old_pass: value.currentPassword,
            new_pass: value.newPassword,
        };
        this.apiService.put<BaseResult>(Endpoint.ChangePassword, [], data)
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

    deleteDocument(id: number, recid: number): Promise<boolean> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id),
            new Queryparams(QueryParamType.QUERY, "recid", recid)
        ];
        return new Promise<boolean>((resolve) => {
            this.apiService.delete(Endpoint.UserDocument, query)
                .subscribe((result: Result<string>) => {
                    if (result.status === "Success") {
                        this.toastr.success(result.message, "User Document");
                        this.apiService.invalidateCache(Endpoint.UserDocument, query);
                        resolve(true);
                    }
                    else {
                        this.toastr.info(result.message, "User Document");
                        resolve(false);
                    }
                });
        });
    }

    switchUnit(unit: Unit) {
        const data = {
            UNIT_ENTID: unit.UNIT_ENTID,
            UNIT_INIT: unit.UNIT_INIT,
        };
        this.apiService.put<Result<number>>(Endpoint.SwitchUnit, [], data)
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
        this.apiService.put<Result<string>>(Endpoint.SwitchRole, [], data)
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

    UpdateAddress(id: number, addressDetail: AddressDetail): Promise<boolean> {
        let query = [
            new Queryparams(QueryParamType.URL, "id", id)
        ];
        return new Promise<boolean>((resolve) => {
            this.apiService.put<Result<string>>(Endpoint.AddressDetail, query, addressDetail)
                .subscribe((result: Result<string>) => {
                    if (result.status === "Success") {
                        this.toastr.success(result.message, "Employee Address");
                        this.apiService.invalidateCache(Endpoint.AddressDetail, query);
                        resolve(true);
                    }
                    else {
                        this.toastr.info(result.message, "Employee Address");
                        resolve(false);
                    }
                });
        });
    }

    getMasterData(type: string, query: Queryparams[] = []): Promise<Array<MasterData>> {
        query.push(new Queryparams(QueryParamType.URL, "dataSource", type));
        return new Promise<Array<MasterData>>((resolve) => {
            this.apiService.get<Array<MasterData>>(Endpoint.Master, query).subscribe(tabs => {
                resolve(tabs);
            });
        });
    }

    getMasterDataPost(type: string, data: any): Promise<Array<MasterData>> {
        let query: Queryparams[] = [];
        query.push(new Queryparams(QueryParamType.URL, "dataSource", type));
        return new Promise<Array<MasterData>>((resolve) => {
            this.apiService.post<Array<MasterData>>(Endpoint.Master, query, data).subscribe(tabs => {
                resolve(tabs);
            });
        });
    }

    getEmployeeAccessDetail(empId: number, roleId: number): Promise<Array<any>> {
        let query: Queryparams[] = [];
        query.push(new Queryparams(QueryParamType.URL, "id", empId));
        query.push(new Queryparams(QueryParamType.URL, "role", roleId));
        return new Promise<Array<any>>((resolve) => {
            this.apiService.get<Array<any>>(Endpoint.AccessDetail, query).subscribe(tabs => {
                resolve(tabs);
            });
        });
    }

    updateEmployeeAccessDetail(empId: number, roleId: number, accessDetail: any): Promise<boolean> {
        let query: Queryparams[] = [];
        query.push(new Queryparams(QueryParamType.URL, "id", empId));
        query.push(new Queryparams(QueryParamType.URL, "role", roleId));
        return new Promise<boolean>((resolve) => {
            this.apiService.put<Result<string>>(Endpoint.AccessDetail, query, accessDetail)
                .subscribe((result: Result<string>) => {
                    if (result.status === "Success") {
                        this.toastr.success(result.message, "Employee Access Detail");
                        resolve(true);
                    }
                    else {
                        this.toastr.info(result.message, "Employee Access Detail");
                        resolve(false);
                    }
                });
        });
    }
}
