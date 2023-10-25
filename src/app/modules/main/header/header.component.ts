import { loadNotifications } from '@/store/notifications/actions';
import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { LoginConfig } from '@/utils/login-config';
import { Role } from '@/utils/role';
import { SessionVariable } from '@/utils/session-variable';
import { Unit } from '@/utils/unit';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
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
export class HeaderComponent implements OnInit, AfterViewInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    @ViewChild('userMenu') userMenu: any;
    @ViewChild('searchForm') searchForm: any;
    public ui: Observable<UiState>;
    public searchFormData: UntypedFormGroup;
    public sessionVariable: Observable<SessionVariable>;
    unitName: string = "";
    unitInit: string = "";
    roleName: string = "";
    loginConfig: LoginConfig = null;
    units: Array<Unit> = null;
    roles: Array<Role> = null;
    width: number = 0;

    constructor(
        private appService: UserService,
        private store: Store<AppState>,
        private elemRef: ElementRef
    ) { }

    ngAfterViewInit(): void {
        this.width = this.searchForm?.nativeElement.clientWidth;
        if (isNaN(this.width))
            this.width = 0;
        this.width += this.userMenu.nativeElement.clientWidth;

        this.width = window.innerWidth - this.width;
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

        this.searchFormData = new UntypedFormGroup({
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

    GetLoginConfig() {
        this.appService.getLoginConfig().then((result) => {
            this.loginConfig = result;
        });
    }
}
