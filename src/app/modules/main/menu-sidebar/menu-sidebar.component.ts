import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api.service';
import { MenuItem, MenuItemDto } from '@/utils/menu-item';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    @ViewChild('sidebarSearch') sidebarSearch: ElementRef;
    public ui: Observable<UiState>;
    public user$: Observable<EmployeeProfile>;
    public menu = MENU;

    emp_image: string = "";
    emp_name: string = "";

    constructor(
        public apiService: ApiService,
        private store: Store<AppState>
    ) {
        this.ui = this.store.select('ui');
    }

    ngOnInit() {
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });

        this.user$ = this.store.select('user');
        this.user$.subscribe((user: any) => {
            let profile = user.profile;
            this.emp_name = profile.emp_name;
            this.emp_image = `data:image/png;base64,${profile.emp_image}`;
        });

        this.GetMenus();
    }

    GetMenus() {
        this.apiService.get<Array<MenuItemDto>>("admin", "admin/menu/Angular")
            .subscribe((menus: Array<MenuItemDto>) => {
                MENU.length = 0;
                menus.forEach(item => {
                    MENU.push(this.setMenuItem(item));
                });
            });
    }

    setMenuItem(menuItem: MenuItemDto): MenuItem {
        let item = new MenuItem();
        item.name = menuItem.name;
        item.iconClasses = menuItem.iconClasses;
        item.path = ['/'];

        if (menuItem.children?.length > 0) {
            item.children = [];
            menuItem.children.forEach(x => {
                item.children.push(this.setMenuItem(x));
            });
        }
        return item;
    }
}

export const MENU: Array<MenuItem> = [];


// {
//     name: 'Dashboard',
//     iconClasses: 'fas fa-tachometer-alt',
//     path: ['/']
// },
// {
//     name: 'Blank',
//     iconClasses: 'fas fa-file',
//     path: ['/blank']
// },
// {
//     name: 'Main Menu',
//     iconClasses: 'fas fa-folder',
//     children: [
//         {
//             name: 'Sub Menu',
//             iconClasses: 'far fa-address-book',
//             path: ['/sub-menu-1']
//         },
//         {
//             name: 'Blank',
//             iconClasses: 'fas fa-file',
//             path: ['/sub-menu-2']
//         }
//     ]
// }