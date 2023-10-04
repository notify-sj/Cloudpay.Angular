import { AppState } from '@/store/state';
import { ToggleControlSidebar, ToggleSidebarMenu } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { SessionVariable } from '@/utils/session-variable';
import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-header navbar navbar-expand';
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
    roleName: string = "";

    constructor(
        private appService: AppService,
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
            let session = res.session as SessionVariable;
            this.unitName = session.unitName;
            this.roleName = session.roleName;
        });

        this.searchForm = new UntypedFormGroup({
            search: new UntypedFormControl(null)
        });
    }

    logout() {
        this.appService.logout();
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }

    onToggleControlSidebar() {
        this.store.dispatch(new ToggleControlSidebar());
    }
}
