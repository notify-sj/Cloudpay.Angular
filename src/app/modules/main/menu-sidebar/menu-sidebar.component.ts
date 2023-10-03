import { AppState } from '@/store/state';
import { loadUserProfile } from '@/store/ui/actions/user.actions';
import { UiState } from '@/store/ui/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user$: Observable<EmployeeProfile>;
    public menu = MENU;

    emp_image: string = "";
    emp_email: string = "";

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {
        this.ui = this.store.select('ui');
        this.user$ = this.store.select('user');
    }

    ngOnInit() {
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        console.log((this.user$));
        this.user$.subscribe((user: EmployeeProfile) => {
            console.log(user.emp_email);
            this.emp_email = user.emp_email;
            this.emp_image = user.emp_image;
        });
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    },
    {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',
        children: [
            {
                name: 'Sub Menu',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            }
        ]
    }
];
