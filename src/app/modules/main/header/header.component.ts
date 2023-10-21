import { loadNotifications } from '@/store/notifications/actions';
import { AppState } from '@/store/state';
import { ToggleSidebarMenu } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { loadUserProfile } from '@/store/user/actions';
import { LoginConfig } from '@/utils/login-config';
import { Role } from '@/utils/role';
import { SessionVariable } from '@/utils/session-variable';
import { Unit } from '@/utils/unit';
import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-header navbar navbar-expand navbar-white navbar-light border-bottom-0';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public searchForm: UntypedFormGroup;
    public sessionVariable: Observable<SessionVariable>;
    isDisabled: boolean = true;
    unitName: string = "";
    unitInit: string = "";
    roleName: string = "";
    loginConfig: LoginConfig = null;
    units: Array<Unit> = null;
    roles: Array<Role> = null;

    constructor(
        private appService: UserService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.navbarVariant}`;
        });

        this.sessionVariable = this.store.select('auth');
        this.sessionVariable.subscribe((res: any) => {
            this.store.dispatch(loadNotifications());
                        let session = res.session as SessionVariable;
            this.unitName = session.unitName;
            this.roleName = session.roleName;
            this.unitInit = session.unit;

            this.GetLoginConfig();
            this.GetAssignedUnits();
            this.GetAssignedRoles();
        });

        this.searchForm = new UntypedFormGroup({
            search: new UntypedFormControl(null)
        });
    }
    GetAssignedRoles() {
        this.appService.getAssignedRoles().then((result) => {
            this.roles = result.filter(x => x.ROLE_NAME != this.roleName);
        });
    }

    GetAssignedUnits() {
        this.appService.getAssignedUnits().then((result) => {
            this.units = result.filter(x => x.UNIT_INIT != this.unitInit);
        });
    }

    logout() {
        this.appService.logout();
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }

    GetLoginConfig() {
        this.appService.getLoginConfig().then((result) => {
            this.loginConfig = result;
        });
    }
}
