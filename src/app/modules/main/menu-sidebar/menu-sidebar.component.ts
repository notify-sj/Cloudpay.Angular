import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api.service';
import { MenuItem, MenuItemDto } from '@/utils/menu-item';
import { SessionVariable } from '@/utils/session-variable';

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
    public sessionVariable$: Observable<SessionVariable>;
    public menu = MENU;
    private _id: number = 0;
    COMPANY_NAME: string = "";

    emp_image: string = "";
    emp_name: string = "";

    constructor(
        public apiService: ApiService,
        private store: Store<AppState>
    ) {
        this.ui = this.store.select('ui');
        this._id = 0;
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

        
        this.sessionVariable$ = this.store.select('auth');
        this.sessionVariable$.subscribe((res: any) => {
            let session = res.session as SessionVariable;
            this.COMPANY_NAME = this.setDomainName(session.domainName);
        });

        this.GetMenus();
    }

    GetMenus() {
        this.apiService.get<Array<MenuItemDto>>("admin", "admin/menu/Angular")
            .subscribe((menus: Array<MenuItemDto>) => {
                MENU.length = 0;
                menus.forEach(item => {
                    MENU.push(this.setMenuItem(item, 0));
                });
            });
    }

    setMenuItem(menuItem: MenuItemDto, parentId: number): MenuItem {
        let item = new MenuItem();
        item.id = ++this._id;
        item.parentId = parentId;
        item.name = menuItem.name;
        item.iconClasses = menuItem.iconClasses;
        item.path = menuItem.routePath;

        if (menuItem.children?.length > 0) {
            item.children = [];
            menuItem.children.forEach(x => {
                item.children.push(this.setMenuItem(x, item.id));
            });
        }
        return item;
    }

    setDomainName(domainName: string): string {
        let _companyName = '';
        switch (domainName) {
          case 'AMPLE':
            _companyName = 'Ample Payroll';
            break;
          case 'PAYMAX':
          case 'RAPPORT':
          case 'TRESPAY':
            _companyName = domainName;
            break;
          default:
            _companyName = 'CloudPay';
            break;
        }
        return _companyName;
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